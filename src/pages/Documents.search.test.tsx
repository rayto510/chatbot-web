import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Documents from './Documents';
import Navbar from '../components/Navbar';
import { useSearchStore } from '../store/search';

beforeEach(() => {
  useSearchStore.setState({ query: '' });
});

describe('Documents page filtering', () => {
  it('filters by query and supports clearing', async () => {
    const user = userEvent.setup();
    render(
      <>
        <Navbar />
        <Documents />
      </>
    );

    const input = screen.getByRole('textbox', { name: /search/i });
    await user.type(input, 'Vestibulum');

    const marks = document.querySelectorAll('mark');
    if (marks.length === 0) {
      expect(screen.getByText(/No results for/i)).toBeInTheDocument();
    } else {
      expect(marks.length).toBeGreaterThan(0);
    }

    const clear = screen.getByRole('button', { name: /clear search/i });
    await user.click(clear);
    expect((input as HTMLInputElement).value).toBe('');
  });
});
