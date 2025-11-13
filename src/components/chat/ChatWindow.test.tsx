import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ChatWindow from './ChatWindow';
import { useChatStore } from '../../store/chat';

function openClean() {
  useChatStore.setState({ isOpen: true, messages: [] });
}
function closedClean() {
  useChatStore.setState({ isOpen: false, messages: [] });
}

describe('ChatWindow', () => {
  beforeEach(() => {
    vi.useFakeTimers({
      toFake: [
        'setTimeout',
        'setInterval',
        'clearTimeout',
        'clearInterval',
        'Date',
      ],
    });
    vi.setSystemTime(new Date('2025-01-01T00:00:00Z'));
    closedClean();
  });

  it('shows launcher when closed and opens on click', async () => {
    render(<ChatWindow />);
    const launcher = screen.getByRole('button', { name: /open chat/i });
    fireEvent.click(launcher);
    await vi.advanceTimersByTimeAsync(0);

    expect(
      screen.getByRole('dialog', { name: /chatbot/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('toolbar', { name: /chat header/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/elapsed/i).closest('.chat-header')!
    ).toHaveTextContent(/Elapsed:\s*0\s*s/i);
  });

  it('sends a user message with Send and receives a bot reply', async () => {
    openClean();
    render(<ChatWindow />);

    const input = screen.getByRole('textbox', { name: /type a message/i });
    fireEvent.change(input, { target: { value: 'Hello there' } });
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    const userBubble = screen.getByText('Hello there');
    expect(
      userBubble.closest('.chat-bubble')?.classList.contains('right')
    ).toBe(true);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    const botBubbles = document.querySelectorAll('.chat-bubble.left');
    expect(botBubbles.length).toBeGreaterThan(0);
  });

  it('sends on Enter (no Shift)', async () => {
    openClean();
    render(<ChatWindow />);

    const input = screen.getByRole('textbox', { name: /type a message/i });
    fireEvent.change(input, { target: { value: 'Ping' } });
    fireEvent.keyDown(input, { key: 'Enter', shiftKey: false });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(screen.getByText('Ping')).toBeInTheDocument();
  });

  it('Reset clears messages and resets the timer', async () => {
    openClean();
    render(<ChatWindow />);

    const input = screen.getByRole('textbox', { name: /type a message/i });
    fireEvent.change(input, { target: { value: 'One' } });
    fireEvent.keyDown(input, { key: 'Enter', shiftKey: false });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
      await vi.advanceTimersByTimeAsync(500); // bot reply lands
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(3000);
    });

    expect(
      screen.getByText(/elapsed/i).closest('.chat-header')!
    ).toHaveTextContent(/Elapsed:\s*3\s*s/i);

    fireEvent.click(screen.getByRole('button', { name: /reset chat/i }));

    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(document.querySelectorAll('.chat-bubble').length).toBe(0);
    expect(
      screen.getByText(/elapsed/i).closest('.chat-header')!
    ).toHaveTextContent(/Elapsed:\s*0\s*s/i);
  });

  it('Close hides chat, shows launcher, and clears history/timer', async () => {
    openClean();
    render(<ChatWindow />);

    const input = screen.getByRole('textbox', { name: /type a message/i });
    fireEvent.change(input, { target: { value: 'Bye' } });
    fireEvent.keyDown(input, { key: 'Enter', shiftKey: false });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
      await vi.advanceTimersByTimeAsync(500);
    });

    fireEvent.click(screen.getByRole('button', { name: /close chat/i }));

    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(
      screen.queryByRole('dialog', { name: /chatbot/i })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /open chat/i })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /open chat/i }));

    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(document.querySelectorAll('.chat-bubble').length).toBe(0);
    expect(
      screen.getByText(/elapsed/i).closest('.chat-header')!
    ).toHaveTextContent(/Elapsed:\s*0\s*s/i);
  });

  it('shows a centered placeholder when there are no messages', () => {
    openClean();
    render(<ChatWindow />);
    const placeholder = screen.getByRole('note');
    expect(placeholder).toHaveTextContent(/type a message below to start/i);
    expect(
      document.querySelector('.chat-messages')?.classList.contains('empty')
    ).toBe(true);
  });

  afterEach(() => vi.useRealTimers());
});
