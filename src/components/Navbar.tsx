import type { FormEvent } from 'react';
import { useSearchStore } from '../store/search';
import { useUIStore } from '../store/ui';
import logo from '../assets/logo.png';

export default function Navbar() {
  const query = useSearchStore((s) => s.query);
  const setQuery = useSearchStore((s) => s.setQuery);
  const clear = useSearchStore((s) => s.clear);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <header className="navbar" role="banner">
      <div className="nav-left">
        <button
          className="hamburger"
          aria-label="Toggle menu"
          aria-controls="sidemenu"
          onClick={toggleSidebar}
        >
          <span aria-hidden>☰</span>
        </button>
        <img
          src={logo}
          alt="Chat logo"
          width={32}
          height={32}
          style={{ borderRadius: '8px' }}
        />
      </div>
      <form className="search" role="search" onSubmit={onSubmit}>
        <div className="search-wrap">
          <input
            aria-label="Search"
            placeholder="Search…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              type="button"
              className="clear-btn"
              aria-label="Clear search"
              onClick={clear}
              title="Clear"
            >
              ×
            </button>
          )}
        </div>
      </form>
    </header>
  );
}
