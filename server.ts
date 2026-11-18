import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GoogleGenAI, ThinkingLevel, type Content } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProduction = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT || 3000);

const AASAN_CHAT_SYSTEM_INSTRUCTION = `You are the official AASAN LIFE Programme & Insurance Learning Advisor.

Your role:
- Help prospective learners (college students, fresh graduates, job seekers, career explorers, and anyone interested in insurance) understand the AASAN LIFE Online Paid Internship Programme and foundational insurance concepts.
- Explain what the programme covers:
  1. Fundamentals of Insurance (principles of insurance, risk protection, insurance terminology, how the industry works)
  2. Life & General Insurance (key differences and core product categories)
  3. Corporate Insurance (Fire, Marine, Engineering, Group Health, and Liability Insurance)
  4. Insurance Operations (processes, documentation, policy structures, and operational activities)
  5. Risk Assessment (how businesses identify, understand, and manage risks)
  6. Professional Skills (communication, customer interaction, research, and industry readiness)
- Confirm that the programme is 100% online and is a paid internship programme open to students, graduates, job seekers, and individuals interested in learning about the insurance industry.

Strict accuracy rules:
- NEVER invent or guess unconfirmed fee amounts, internship duration, stipend/salary figures, job placement guarantees, or certificate guarantees.
- Whenever asked about exact fees, duration, batch dates, stipends, certificates, or placement opportunities, politely clarify that those details are confirmed directly by the AASAN LIFE team and encourage the user to submit an enquiry on the Contact Us page (or via the Apply for Internship form).
- Keep responses concise, structured, accurate, and warm (under 180 words unless the user asks for a detailed explanation of an insurance topic).`;

interface ChatHistoryMessage {
  role: 'user' | 'model';
  text: string;
}

interface ChatRequestBody {
  message?: string;
  history?: ChatHistoryMessage[];
}

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error(
      'GEMINI_API_KEY is not configured. Please add your Gemini API key in Settings > Secrets.'
    );
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ ok: true });
  });

  app.post('/api/chat', async (req: Request, res: Response) => {
    try {
      const body = (req.body || {}) as ChatRequestBody;
      const userMessage = typeof body.message === 'string' ? body.message.trim() : '';

      if (!userMessage) {
        res.status(400).json({ error: 'Please enter a message before sending.' });
        return;
      }

      const rawHistory = Array.isArray(body.history) ? body.history : [];
      const history: Content[] = rawHistory
        .filter(
          (item): item is ChatHistoryMessage =>
            Boolean(item) &&
            (item.role === 'user' || item.role === 'model') &&
            typeof item.text === 'string' &&
            item.text.trim().length > 0
        )
        .slice(-20)
        .map((item) => ({
          role: item.role,
          parts: [{ text: item.text.trim() }],
        }));

      const ai = getGeminiClient();
      const chat = ai.chats.create({
        model: 'gemini-4-hydrogen',
        history,
        config: {
          systemInstruction: AASAN_CHAT_SYSTEM_INSTRUCTION,
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.LOW,
          },
        },
      });

      const response = await chat.sendMessage({
        message: userMessage,
      });
      const reply = response.text?.trim();

      if (!reply) {
        res.status(502).json({
          error: 'The advisor could not generate a response right now. Please try asking again.',
        });
        return;
      }

      res.json({ reply });
    } catch (error) {
      console.error('Gemini chat error:', error);
      const rawMessage =
        error instanceof Error ? error.message : 'Unexpected server error while contacting Gemini.';

      if (
        rawMessage.includes('GEMINI_API_KEY') ||
        rawMessage.includes('API_KEY_INVALID') ||
        rawMessage.includes('PERMISSION_DENIED')
      ) {
        res.status(400).json({
          error:
            'Gemini API key is missing or invalid. Please check your key in Settings > Secrets.',
        });
        return;
      }

      if (rawMessage.includes('RESOURCE_EXHAUSTED') || rawMessage.includes('429')) {
        res.status(429).json({
          error: 'Rate limit reached momentarily. Please wait a few seconds and try again.',
        });
        return;
      }

      if (rawMessage.includes('NOT_FOUND') || rawMessage.includes('404')) {
        res.status(502).json({
          error: 'The configured Gemini model could not be found. Please check model settings.',
        });
        return;
      }

      res.status(500).json({
        error: `Unable to reach the AASAN LIFE Advisor right now (${rawMessage.slice(0, 120)}).`,
      });
    }
  });

  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      const indexPath = path.join(distDir, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send('Build output not found. Run npm run build first.');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AASAN LIFE server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start AASAN LIFE server:', err);
  process.exit(1);
});
