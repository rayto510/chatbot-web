import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Highlighted from './Highlighted';

describe('Highlighted', () => {
  it('wraps matches in <mark> (case-insensitive)', () => {
    const { container } = render(
      <p>
        <Highlighted text="Hello lorem LOrem world" query="lorem" />
      </p>
    );
    const marks = container.querySelectorAll('mark');
    expect(marks.length).toBe(2);
    expect(marks[0].textContent).toBe('lorem');
    expect(marks[1].textContent).toBe('LOrem');
  });

  it('escapes regex characters in query', () => {
    const { container } = render(
      <p>
        <Highlighted text="a+b a*b a?b" query="a+b" />
      </p>
    );
    expect(container.querySelectorAll('mark').length).toBe(1);
  });

  it('renders plain text when query is empty', () => {
    const { container } = render(
      <p>
        <Highlighted text="foo bar" query="" />
      </p>
    );
    expect(container.querySelectorAll('mark').length).toBe(0);
  });
});
