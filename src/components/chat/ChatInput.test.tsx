import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChatInput from './ChatInput';
import { useChatStore } from '../../store/chat';
import { vi } from 'vitest';

function resetStore() {
  useChatStore.setState({ messages: [], isOpen: true });
}

describe('ChatInput', () => {
  beforeEach(() => {
    resetStore(); // real timers here – userEvent uses timeouts internally
  });

  it('updates value when typing', async () => {
    const user = userEvent.setup();
    render(<ChatInput />);
    const input = screen.getByRole('textbox', { name: /type a message/i });

    await user.type(input, 'Hello');
    expect(input).toHaveValue('Hello');
  });

  it('sends message on Enter and clears input', async () => {
    const user = userEvent.setup();
    render(<ChatInput />);
    const input = screen.getByRole('textbox', { name: /type a message/i });

    await user.type(input, 'Hi{enter}');
    expect(input).toHaveValue('');

    const texts = useChatStore.getState().messages.map((m) => m.text);
    expect(texts).toContain('Hi');
  });

  it('sends message when clicking Send button', async () => {
    const user = userEvent.setup();
    render(<ChatInput />);
    const input = screen.getByRole('textbox', { name: /type a message/i });

    await user.type(input, 'Click send');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(input).toHaveValue('');
    const texts = useChatStore.getState().messages.map((m) => m.text);
    expect(texts).toContain('Click send');
  });

  it('does nothing when input is empty', async () => {
    const user = userEvent.setup();
    const spy = vi.spyOn(useChatStore.getState(), 'sendUserMessage');
    render(<ChatInput />);

    const input = screen.getByRole('textbox', { name: /type a message/i });
    await user.type(input, '{enter}');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(spy).not.toHaveBeenCalled();
  });
});
