// Stub book catalog. In v2 this becomes a real generated index across multiple books.
// For the contest entry we author it by hand so the TOC overlay and search look real.

export const catalog = {
  books: [
    {
      slug: 'advanced-jobs-to-be-done',
      title: 'Advanced Jobs To Be Done',
      shortTitle: 'AJTBD',
      author: 'Ivan Zamesin',
      status: 'in-progress',
      stats: {
        published: 28,
        drafting: 12,
      },
      parts: [
        {
          num: 1,
          title: 'Foundations',
          chapters: [
            {
              num: 1,
              slug: 'introduction-to-advanced-jobs-to-be-done',
              title: 'Introduction to Advanced Jobs To Be Done',
              state: 'active',
              snippets: [
                'Value is performing the customer\'s jobs in a more energy-efficient way.',
                'A problem is a prediction error in the brain\'s model.',
                'Innovation is the application of value-creation mechanics — that is, innovation is an algorithm.',
              ],
            },
            { num: 2, slug: 'types-of-jobs', title: 'Types of jobs and their properties', state: 'next' },
            { num: 3, slug: 'consideration-set', title: 'The consideration set', state: 'published' },
            { num: 4, slug: 'segments-subsegments', title: 'Segments and sub-segments', state: 'published' },
            { num: 5, slug: 'critical-sequences', title: 'Critical sequences', state: 'draft' },
          ],
        },
        {
          num: 2,
          title: 'The work graph in practice',
          chapters: [
            { num: 6, slug: 'drawing-graphs', title: 'Drawing the work graph from scratch', state: 'published' },
            { num: 7, slug: 'graph-shape', title: 'Shapes the graph takes in different categories', state: 'published' },
            { num: 8, slug: 'mistakes-graph', title: 'Five mistakes teams make on their first graph', state: 'published' },
            { num: 9, slug: 'graph-validation', title: 'Validating a graph against the customer', state: 'draft' },
          ],
        },
        {
          num: 3,
          title: 'Value mechanics',
          chapters: [
            { num: 10, slug: 'value-mechanics-basics', title: 'The base mechanics of value', state: 'published' },
            { num: 11, slug: 'value-mechanics-combined', title: 'Combined and emergent mechanics', state: 'published' },
            { num: 12, slug: 'killing-jobs', title: 'Killing jobs — the central move', state: 'published' },
            { num: 13, slug: 'prediction-errors', title: 'Designing for positive prediction errors', state: 'draft' },
          ],
        },
        {
          num: 4,
          title: 'Interviews and field work',
          chapters: [
            { num: 14, slug: 'ajtbd-interview', title: 'The AJTBD interview, end to end', state: 'published' },
            { num: 15, slug: 'i-want-to-template', title: 'The "I want to {verb}" template, in depth', state: 'published' },
            { num: 16, slug: 'reading-the-transcript', title: 'Reading a transcript like a graph', state: 'draft' },
          ],
        },
        {
          num: 5,
          title: 'Strategy moves',
          chapters: [
            { num: 17, slug: 'point-of-growth', title: 'Finding the point of growth', state: 'published' },
            { num: 18, slug: 'step-up-step-back', title: 'Step up, step back, step sideways', state: 'published' },
            { num: 19, slug: 'aviasales-case', title: 'Case: Aviasales and the previous job', state: 'published' },
            { num: 20, slug: 'lift-case', title: 'Case: LiFT and the higher-level job', state: 'draft' },
          ],
        },
        {
          num: 6,
          title: 'Communicating the product',
          chapters: [
            { num: 21, slug: 'positioning', title: 'Positioning out of the graph', state: 'published' },
            { num: 22, slug: 'landing-copy', title: 'Landing copy as a graph projection', state: 'draft' },
            { num: 23, slug: 'sales-scripts', title: 'Sales scripts and "firing the competitor"', state: 'draft' },
          ],
        },
      ],
    },
  ],
};

// Flattened search index: { id, bookSlug, bookTitle, partNum, partTitle, chapterNum, chapterTitle, snippet }
export function buildSearchDocs(cat = catalog) {
  const docs = [];
  for (const book of cat.books) {
    for (const part of book.parts) {
      for (const ch of part.chapters) {
        const snippets = ch.snippets && ch.snippets.length ? ch.snippets : [''];
        snippets.forEach((sn, i) => {
          docs.push({
            id: `${book.slug}/${ch.slug}#${i}`,
            bookSlug: book.slug,
            bookTitle: book.title,
            partNum: part.num,
            partTitle: part.title,
            chapterNum: ch.num,
            chapterSlug: ch.slug,
            chapterTitle: ch.title,
            state: ch.state,
            snippet: sn,
          });
        });
      }
    }
  }
  return docs;
}
