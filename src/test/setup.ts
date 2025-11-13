// src/test/setup.ts
/// <reference types="node" />
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Lazy-load file content once and cache
let cache: Record<string, string> | null = null;

async function loadFiles() {
  if (cache) return cache;

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const root = resolve(__dirname, '..', '..'); // project root
  const appsPath = resolve(root, 'src', 'data', 'apps.txt');
  const docsPath = resolve(root, 'src', 'data', 'documents.txt');

  cache = {
    '/src/data/apps.txt': readFileSync(appsPath, 'utf8'),
    '/src/data/documents.txt': readFileSync(docsPath, 'utf8'),
  };
  return cache!;
}

// Minimal Response polyfill not needed in jsdom/undici, but keep types happy
vi.stubGlobal('fetch', async (input: any) => {
  const url = typeof input === 'string' ? input : String(input?.url ?? input);
  const files = await loadFiles();
  const body = files[url] ?? ''; // return empty string for unknown paths so components still render

  return new Response(body, {
    status: 200,
    headers: { 'Content-Type': 'text/plain' },
  });
});

// avoid errors from scrollIntoView in jsdom
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = vi.fn();
}
