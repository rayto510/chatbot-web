import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from './Navbar';
import { useSearchStore } from '../store/search';

beforeEach(() => {
  useSearchStore.setState({ query: '' });
});

describe('Navbar search', () => {
  it('updates global query and can clear it', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const input = screen.getByRole('textbox', { name: /search/i });

    await user.type(input, 'pellentesque');
    expect(useSearchStore.getState().query).toBe('pellentesque');

    const clear = screen.getByRole('button', { name: /clear search/i });
    await user.click(clear);
    expect((input as HTMLInputElement).value).toBe('');
    expect(useSearchStore.getState().query).toBe('');
  });
});
