import MarkdownIt from 'markdown-it';
import markdownItAttrs from 'markdown-it-attrs';
import markdownItFootnote from 'markdown-it-footnote';
import markdownItAnchor from 'markdown-it-anchor';
import markdownItContainer from 'markdown-it-container';

function parseFrontmatter(source) {
  if (!source.startsWith('---\n')) return { meta: {}, body: source };
  const end = source.indexOf('\n---\n', 4);
  if (end === -1) return { meta: {}, body: source };
  const block = source.slice(4, end);
  const body = source.slice(end + 5);
  const meta = parseYamlLike(block);
  return { meta, body };
}

function parseYamlLike(block) {
  const lines = block.split('\n');
  const out = {};
  let key = null;
  let nested = null;
  let nestedKey = null;
  for (const line of lines) {
    if (!line.trim()) continue;
    const indent = line.match(/^\s*/)[0].length;
    const trimmed = line.trim();
    if (indent === 0) {
      const m = trimmed.match(/^([A-Za-z][A-Za-z0-9_]*):\s*(.*)$/);
      if (!m) continue;
      key = m[1];
      const val = m[2];
      if (val === '') {
        out[key] = {};
        nested = out[key];
        nestedKey = key;
      } else if (val.startsWith('- ')) {
        out[key] = [val.slice(2).trim().replace(/^["'](.*)["']$/, '$1')];
        nested = null;
      } else {
        out[key] = stripQuotes(val);
        nested = null;
      }
    } else if (line.match(/^\s+-\s+/)) {
      const item = line.replace(/^\s+-\s+/, '').trim();
      if (Array.isArray(out[key])) {
        out[key].push(stripQuotes(item));
      } else {
        out[key] = [stripQuotes(item)];
      }
    } else if (nested) {
      const m = trimmed.match(/^([A-Za-z][A-Za-z0-9_]*):\s*(.*)$/);
      if (m) nested[m[1]] = stripQuotes(m[2]);
    }
  }
  return out;
}

function stripQuotes(s) {
  s = s.trim();
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1);
  }
  return s;
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function galleryContainer(md) {
  return [
    'gallery',
    {
      validate(params) {
        return params.trim().startsWith('gallery');
      },
      render(tokens, idx) {
        const token = tokens[idx];
        if (token.nesting === 1) {
          const info = token.info.trim();
          const attrs = parseInlineAttrs(info.slice('gallery'.length));
          const layout = attrs.layout || 'row';
          const columns = attrs.columns ? ` data-columns="${attrs.columns}"` : '';
          const caption = attrs.caption ? md.utils.escapeHtml(attrs.caption) : '';
          return `<figure class="gallery" data-layout="${layout}"${columns}>\n<div class="gallery__track">\n`;
        }
        const closeAttrs = findOpeningAttrs(tokens, idx);
        const caption = closeAttrs.caption ? `<figcaption class="gallery__caption">${md.utils.escapeHtml(closeAttrs.caption)}</figcaption>` : '';
        return `</div>\n${caption}\n</figure>\n`;
      },
    },
  ];
}

function findOpeningAttrs(tokens, closeIdx) {
  for (let i = closeIdx - 1; i >= 0; i--) {
    const t = tokens[i];
    if (t.type === 'container_gallery_open') {
      return parseInlineAttrs(t.info.trim().slice('gallery'.length));
    }
  }
  return {};
}

function parseInlineAttrs(rest) {
  // Accept `[layout="strip" caption="..."]` (preferred, bypasses markdown-it-attrs)
  // or `{layout="strip"}` (legacy — only works when attrs plugin doesn't see it).
  const out = {};
  const m = /\[([^\]]*)\]|\{([^}]*)\}/.exec(rest);
  if (!m) return out;
  const inside = m[1] ?? m[2] ?? '';
  const attrRe = /([A-Za-z][A-Za-z0-9_-]*)\s*=\s*(?:"([^"]*)"|([^\s\]}]+))/g;
  let am;
  while ((am = attrRe.exec(inside)) !== null) {
    out[am[1]] = am[2] ?? am[3] ?? '';
  }
  return out;
}

function calloutContainer(md) {
  return [
    'callout',
    {
      validate(params) {
        return params.trim().startsWith('callout');
      },
      render(tokens, idx) {
        const token = tokens[idx];
        if (token.nesting === 1) {
          const attrs = parseInlineAttrs(token.info.trim().slice('callout'.length));
          const variant = attrs.variant || 'note';
          return `<aside class="callout" data-variant="${variant}">\n`;
        }
        return `</aside>\n`;
      },
    },
  ];
}

function skepticRule(md) {
  const defaultRender = md.renderer.rules.blockquote_open || function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };
  md.renderer.rules.blockquote_open = function (tokens, idx, options, env, self) {
    const blockquote = tokens[idx];
    const next = tokens[idx + 1];
    if (next && next.type === 'paragraph_open') {
      const inline = tokens[idx + 2];
      if (inline && inline.type === 'inline' && /^\s*(?:<strong>|\*\*)Skeptic(?::|<\/strong>:|\*\*:)/i.test(inline.content)) {
        blockquote.attrJoin('class', 'skeptic');
      }
    }
    return defaultRender(tokens, idx, options, env, self);
  };
}

export function createMarkdown() {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    breaks: false,
  });

  md.use(markdownItAttrs);
  md.use(markdownItFootnote);
  md.use(markdownItAnchor, {
    slugify,
    permalink: markdownItAnchor.permalink.linkInsideHeader({
      symbol: '#',
      placement: 'before',
      class: 'heading-anchor',
      ariaHidden: true,
    }),
  });
  md.use(markdownItContainer, ...galleryContainer(md));
  md.use(markdownItContainer, ...calloutContainer(md));
  skepticRule(md);

  function extractToc(source) {
    const headings = [];
    const lines = source.split('\n');
    let inCode = false;
    for (const line of lines) {
      if (line.startsWith('```')) {
        inCode = !inCode;
        continue;
      }
      if (inCode) continue;
      const m = line.match(/^(#{2,4})\s+(.+?)\s*#*\s*$/);
      if (m) {
        const level = m[1].length;
        const text = m[2].replace(/[`*_]/g, '').trim();
        headings.push({ level, text, slug: slugify(text) });
      }
    }
    return headings;
  }

  function renderFull(source) {
    const { meta, body } = parseFrontmatter(source);
    const toc = extractToc(body);
    const html = md.render(body);
    return { html, meta, toc };
  }

  md.renderFull = renderFull;
  md.extractToc = extractToc;
  return md;
}
