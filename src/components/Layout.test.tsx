import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { vi } from 'vitest';

vi.stubGlobal('fetch', (url: string) =>
  Promise.resolve(
    new Response(url.includes('apps.txt') ? 'apps text' : 'documents text', {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    })
  )
);

it('renders navbar, side menu, and apps page by default', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByRole('banner')).toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: /main/i })).toBeInTheDocument();
  // Wait for async fetch to complete (heading is always rendered, but this ensures state updates are handled)
  await screen.findByRole('heading', { name: /apps page/i });
});

it('navigates to documents page', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  fireEvent.click(screen.getByText(/^documents$/i));

  // Wait for async fetch to complete
  await screen.findByRole('heading', { name: /documents page/i });
});
