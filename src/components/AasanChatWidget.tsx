import React, { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  Bot,
  Loader2,
  RotateCcw,
  Send,
  User,
  X,
} from 'lucide-react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'model',
  text: "Hello! I'm the AASAN LIFE Programme & Insurance Learning Advisor. Ask me about our Online Paid Internship Programme, the 6 insurance learning modules, who can apply, or how to submit an enquiry.",
};

const STARTER_PROMPTS = [
  'What is the AASAN LIFE Paid Internship Programme?',
  'What topics are covered in Corporate Insurance?',
  'Who is eligible to apply for the internship?',
  'How do I enquire and get fee or duration details?',
];

interface AasanChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AasanChatWidget: React.FC<AasanChatWidgetProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const threadEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      threadEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      const timer = window.setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => window.clearTimeout(timer);
    }
  }, [isOpen, messages, isLoading]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const sendMessage = async (rawText: string) => {
    const trimmed = rawText.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };

    const historyForApi = messages
      .filter((m) => m.id !== 'welcome')
      .map((m) => ({ role: m.role, text: m.text }));

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: historyForApi,
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        reply?: string;
        error?: string;
      };

      if (!response.ok || !data.reply) {
        throw new Error(
          data.error || `Unable to get a response from Gemini (HTTP ${response.status}).`
        );
      }

      const modelMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: data.reply,
      };
      setMessages((prev) => [...prev, modelMsg]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to connect to the AASAN LIFE Advisor right now.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    void sendMessage(input);
  };

  const handleResetChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setError(null);
    setInput('');
  };

  if (!isOpen) return null;

  const showStarters = messages.length <= 1 && !isLoading;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="AASAN LIFE Gemini Advisor Chat"
      className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[520px] max-h-[76vh] bg-white rounded-2xl border border-[#0A2055]/15 shadow-[0_20px_56px_rgba(10,32,85,0.26)] flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="px-4 py-3.5 bg-[#0A2055] text-white flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-[#1455D9] flex items-center justify-center shrink-0">
            <Bot className="w-5 h-5 text-[#FF851B]" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h2 className="text-sm font-bold text-white truncate">AASAN LIFE Advisor</h2>
            <p className="text-[11px] text-white/75 truncate">
              Programme &amp; Insurance Learning Guide
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={handleResetChat}
            title="Clear conversation"
            aria-label="Clear conversation"
            className="w-8 h-8 rounded-lg text-white/75 hover:text-white hover:bg-white/12 inline-flex items-center justify-center transition-colors"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onClose}
            title="Close chat"
            aria-label="Close AASAN LIFE Advisor"
            className="w-8 h-8 rounded-lg text-white/75 hover:text-white hover:bg-white/12 inline-flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Scrollable Conversation Thread */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F5F8FC]/60">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : ''}`}
            >
              <div
                aria-hidden="true"
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  isUser ? 'bg-[#1455D9] text-white' : 'bg-[#0A2055] text-[#FF851B]'
                }`}
              >
                {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                  isUser
                    ? 'bg-[#1455D9] text-white rounded-tr-xs'
                    : 'bg-white text-[#17233D] border border-[#0A2055]/10 rounded-tl-xs shadow-2xs'
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}

        {showStarters && (
          <div className="pt-2 space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#0A2055]/60">
              Suggested Questions
            </p>
            <div className="flex flex-col gap-2">
              {STARTER_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => void sendMessage(prompt)}
                  className="text-left text-xs font-medium text-[#0A2055] bg-white hover:bg-[#1455D9] hover:text-white border border-[#0A2055]/12 hover:border-[#1455D9] rounded-lg px-3 py-2 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex items-start gap-2.5">
            <div
              aria-hidden="true"
              className="w-7 h-7 rounded-full bg-[#0A2055] text-[#FF851B] flex items-center justify-center shrink-0"
            >
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="bg-white border border-[#0A2055]/10 rounded-2xl rounded-tl-xs px-3.5 py-2.5 text-xs font-medium text-[#17233D]/70 inline-flex items-center gap-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#1455D9]" aria-hidden="true" />
              <span>Thinking...</span>
            </div>
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs"
          >
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}

        <div ref={threadEndRef} />
      </div>

      {/* Message Composer */}
      <form
        onSubmit={handleFormSubmit}
        className="p-3 bg-white border-t border-[#0A2055]/10 flex items-center gap-2 shrink-0"
      >
        <label htmlFor="aasan-chat-input" className="sr-only">
          Ask a question about AASAN LIFE
        </label>
        <input
          ref={inputRef}
          id="aasan-chat-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about the internship or insurance..."
          disabled={isLoading}
          className="flex-1 px-3.5 py-2.5 text-sm text-[#17233D] bg-[#F5F8FC] border border-[#0A2055]/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1455D9]/30 focus:border-[#1455D9] focus:bg-white disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          aria-label="Send message"
          className="w-10 h-10 rounded-lg bg-[#1455D9] hover:bg-[#0A2055] disabled:opacity-50 disabled:cursor-not-allowed text-white inline-flex items-center justify-center transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1455D9]"
        >
          <Send className="w-4 h-4" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
};
