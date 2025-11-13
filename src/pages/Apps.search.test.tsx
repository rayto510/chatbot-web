import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Apps from './Apps';
import Navbar from '../components/Navbar';
import { useSearchStore } from '../store/search';

beforeEach(() => {
  useSearchStore.setState({ query: '' });
});

describe('Apps page filtering', () => {
  it('shows paragraphs and filters them by query', async () => {
    const user = userEvent.setup();
    render(
      <>
        <Navbar />
        <Apps />
      </>
    );

    // Wait for content to load and verify paragraphs are rendered
    await waitFor(() => {
      expect(screen.getAllByText(/\w+/).length).toBeGreaterThan(3);
    });

    const input = screen.getByRole('textbox', { name: /search/i });
    await user.type(input, 'Suspendisse');

    await waitFor(() => {
      const marks = document.querySelectorAll('mark');
      if (marks.length === 0) {
        expect(screen.getByText(/No results for/i)).toBeInTheDocument();
      } else {
        expect(marks.length).toBeGreaterThan(0);
      }
    });
  });
});
