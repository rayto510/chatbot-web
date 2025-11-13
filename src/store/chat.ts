import { create } from 'zustand';
import type { ChatMessage } from '../types/chat';

const BOT_REPLIES = [
  'Sure! Let me check that.',
  "Here's a quick tip: try refreshing and retrying.",
  'Got it — on it!',
  'Interesting. Can you tell me more?',
  'All set. Anything else?',
];

function uuid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export type ChatState = {
  isOpen: boolean;
  messages: ChatMessage[];
  open: () => void;
  close: () => void; // closes and clears
  reset: () => void; // clears but keeps open
  sendUserMessage: (text: string) => void;
};

export const useChatStore = create<ChatState>((set, get) => ({
  isOpen: false,
  messages: [],
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false, messages: [] }),
  reset: () => set({ messages: [] }),
  sendUserMessage: (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: ChatMessage = {
      id: uuid(),
      role: 'user',
      text: trimmed,
      timestamp: Date.now(),
    };
    set((s) => ({ messages: [...s.messages, userMsg] }));

    // simulate bot reply after a short delay
    const reply = BOT_REPLIES[Math.floor(Math.random() * BOT_REPLIES.length)];
    setTimeout(() => {
      // if chat was closed and cleared, skip
      const { messages } = get();
      // still append
      const botMsg: ChatMessage = {
        id: uuid(),
        role: 'bot',
        text: reply,
        timestamp: Date.now(),
      };
      set({ messages: [...messages, botMsg] });
    }, 450);
  },
}));
