/**
 * Helpers for content written in the dashboard's rich text editor.
 *
 * The editor stores HTML (TipTap / ProseMirror output: `<p>`, `<ul><li><p>`,
 * `<strong>`, …). Records created before the editor existed are plain text
 * with newlines, so everything here has to handle both shapes.
 */

const HTML_TAG = /<(p|h[1-6]|ul|ol|li|strong|b|em|i|u|s|a|img|pre|code|blockquote|table|hr|br|span|div|figure|mark)\b[^>]*>/i;

/** True when the value came out of the editor rather than a plain textarea. */
export const looksLikeHtml = (value?: string | null): boolean =>
  !!value && HTML_TAG.test(value);

const ENTITIES: Record<string, string> = {
  "&nbsp;": " ",
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
};

/**
 * Flattens editor HTML to a single line of readable text — for card previews,
 * meta descriptions and anywhere a clamped excerpt is needed. Block ends
 * become spaces so words from two paragraphs never run together.
 */
export function htmlToText(value?: string | null): string {
  if (!value) return "";

  return value
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, "")
    .replace(/<\/(p|div|li|h[1-6]|blockquote|tr)>/gi, " ")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z#0-9]+;/gi, (m) => ENTITIES[m.toLowerCase()] ?? " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Tags the editor can produce that are safe to render. */
export const ALLOWED_TAGS = [
  "p", "br", "hr", "span", "div",
  "h1", "h2", "h3", "h4", "h5", "h6",
  "strong", "b", "em", "i", "u", "s", "del", "mark", "sub", "sup",
  "ul", "ol", "li",
  "blockquote", "pre", "code",
  "a", "img", "figure", "figcaption",
  "table", "thead", "tbody", "tr", "th", "td",
];

export const ALLOWED_ATTR = [
  "href", "target", "rel",
  "src", "alt", "width", "height", "loading",
  "colspan", "rowspan",
  "class", "style",
];
