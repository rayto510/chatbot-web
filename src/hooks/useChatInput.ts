import { useState } from 'react';
import { useChatStore } from '../store/chat';

/**
 * Custom hook for managing chat input state and sending messages.
 * Handles Enter key submission and provides send functionality.
 */
export function useChatInput() {
  const [value, setValue] = useState('');
  const send = useChatStore((s) => s.sendUserMessage);

  const doSend = () => {
    if (!value.trim()) return;
    send(value);
    setValue('');
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      doSend();
    }
  };

  return {
    value,
    setValue,
    doSend,
    handleKeyDown,
  };
}
