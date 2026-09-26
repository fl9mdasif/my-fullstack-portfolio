"use client";

import { useMemo } from "react";
import DOMPurify from "dompurify";
import { cn } from "@/utils/cn";
import {
  ALLOWED_ATTR,
  ALLOWED_TAGS,
  looksLikeHtml,
} from "@/utils/richText";

/** Shared prose styling for anything written in the dashboard editor. */
const PROSE = `
  prose prose-invert max-w-none
  prose-p:text-white/60 prose-p:leading-[1.9]
  prose-headings:text-white prose-headings:tracking-tight
  prose-h1:text-3xl prose-h1:mt-10 prose-h1:mb-4
  prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3
  prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-2
  prose-strong:text-white prose-strong:font-semibold
  prose-em:text-white/70
  prose-code:text-purple prose-code:bg-purple/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
  prose-pre:bg-white/[0.04] prose-pre:border prose-pre:border-white/[0.07] prose-pre:rounded-xl prose-pre:text-white/70
  prose-blockquote:border-l-purple prose-blockquote:text-white/50 prose-blockquote:bg-white/[0.02] prose-blockquote:rounded-r-lg prose-blockquote:py-1 prose-blockquote:not-italic
  prose-ul:text-white/60 prose-ol:text-white/60
  prose-li:marker:text-purple prose-li:my-1
  prose-img:rounded-xl prose-img:border prose-img:border-white/[0.07]
  prose-hr:border-white/[0.06]
  prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
  prose-table:text-white/60 prose-th:text-white
`;

/**
 * Renders content from the dashboard editor.
 *
 * Editor HTML is sanitised before it reaches the DOM — the markup is written
 * elsewhere and arrives over the API, so it is treated as untrusted. Legacy
 * plain-text records fall back to preserved line breaks.
 */
export function RichText({
  content,
  className,
}: {
  content?: string | null;
  className?: string;
}) {
  const isHtml = looksLikeHtml(content);

  const html = useMemo(() => {
    if (!isHtml || !content) return "";
    // DOMPurify needs a DOM, so this only runs in the browser; on the server
    // the plain-text branch below renders instead and the effect of hydration
    // is a single swap to the formatted version.
    if (typeof window === "undefined") return "";
    return DOMPurify.sanitize(content, {
      ALLOWED_TAGS,
      ALLOWED_ATTR,
      ALLOW_DATA_ATTR: false,
      ADD_ATTR: ["target"],
    });
  }, [content, isHtml]);

  if (!content) return null;

  if (isHtml && html) {
    return (
      <div
        className={cn(PROSE, className)}
        // Sanitised immediately above.
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <div className={cn(PROSE, className)}>
      <div className="whitespace-pre-line text-white/60 leading-[1.9]">
        {isHtml ? content.replace(/<[^>]+>/g, " ") : content}
      </div>
    </div>
  );
}
