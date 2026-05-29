/**
 * Partial, case-insensitive match on task title (heading).
 */
export const matchesTitlePartial = (title, query) => {
  const term = query?.trim().toLowerCase();
  if (!term) return true;
  return (title || '').toLowerCase().includes(term);
};

/**
 * Split title into segments for highlight rendering.
 */
export const getTitleHighlightParts = (title, query) => {
  const text = title || '';
  const term = query?.trim();
  if (!term) return [{ text, highlight: false }];

  const lowerText = text.toLowerCase();
  const lowerTerm = term.toLowerCase();
  const index = lowerText.indexOf(lowerTerm);

  if (index === -1) return [{ text, highlight: false }];

  return [
    { text: text.slice(0, index), highlight: false },
    { text: text.slice(index, index + term.length), highlight: true },
    { text: text.slice(index + term.length), highlight: false }
  ].filter((part) => part.text.length > 0);
};
