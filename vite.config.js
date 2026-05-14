import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createMarkdown } from './src/lib/markdown.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const chapterPath = resolve(__dirname, 'demo-chapter.md');

function chapterPlugin() {
  const md = createMarkdown();

  function renderChapter() {
    const source = readFileSync(chapterPath, 'utf-8');
    const { html, meta, toc } = md.renderFull(source);
    return { html, meta, toc };
  }

  return {
    name: 'aura-chapter',
    transformIndexHtml: {
      order: 'pre',
      handler(htmlTemplate) {
        const { html, meta, toc } = renderChapter();
        return htmlTemplate
          .replace('<!-- @chapter-html -->', html)
          .replace('<!-- @chapter-data -->', `<script type="application/json" id="chapter-meta">${JSON.stringify({ meta, toc })}</script>`);
      },
    },
    handleHotUpdate({ file, server }) {
      if (file === chapterPath) {
        server.ws.send({ type: 'full-reload' });
        return [];
      }
    },
  };
}

export default defineConfig({
  root: '.',
  // Subpath because GitHub Pages serves project sites at https://<user>.github.io/<repo>/.
  // Override with VITE_BASE=/ when serving from a custom domain or a different host.
  base: process.env.VITE_BASE ?? '/zamesin-book/',
  plugins: [chapterPlugin()],
  server: {
    port: 5173,
    open: false,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
