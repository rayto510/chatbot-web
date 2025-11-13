// src/components/chat/ChatMessages.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import ChatMessages from './ChatMessages';
import { useChatStore } from '../../store/chat';

describe('ChatMessages', () => {
  it('shows placeholder when empty, bubbles when messages exist', () => {
    act(() => {
      useChatStore.setState({ messages: [] });
    });
    const { rerender } = render(<ChatMessages />);
    expect(screen.getByRole('note')).toBeInTheDocument();

    act(() => {
      useChatStore.setState({
        messages: [
          { id: '1', role: 'user', text: 'Hi', timestamp: Date.now() },
          { id: '2', role: 'bot', text: 'Hello!', timestamp: Date.now() },
        ],
      });
    });
    rerender(<ChatMessages />);
    expect(screen.queryByRole('note')).not.toBeInTheDocument();
    expect(screen.getByText('Hi')).toBeInTheDocument();
    expect(screen.getByText('Hello!')).toBeInTheDocument();
  });
});
