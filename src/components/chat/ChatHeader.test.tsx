import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import ChatHeader from './ChatHeader';

describe('ChatHeader timer', () => {
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
  });

  it('increments every second', async () => {
    render(<ChatHeader />);

    // initial
    expect(
      screen.getByText(/elapsed/i).parentElement || screen.getByText(/elapsed/i)
    ).toHaveTextContent(/Elapsed:\s*0\s*s/i);

    // Advance by 1 second and check update
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });
    expect(
      screen.getByText(/elapsed/i).closest('.chat-header')!
    ).toHaveTextContent(/Elapsed:\s*1\s*s/i);

    // Advance by 4 more seconds (total 5)
    await act(async () => {
      await vi.advanceTimersByTimeAsync(4000);
    });
    expect(
      screen.getByText(/elapsed/i).closest('.chat-header')!
    ).toHaveTextContent(/Elapsed:\s*5\s*s/i);
  });

  afterEach(() => vi.useRealTimers());
});
