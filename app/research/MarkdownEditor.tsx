"use client";

import { useMemo, useState, useCallback } from "react";
import DOMPurify from "dompurify";

function renderMarkdown(text: string): string {
  let html = text;

  // Code blocks (fenced)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) =>
    `<pre class="bg-[#1a1f21] text-[#00B894] p-3 rounded-lg overflow-x-auto text-xs font-mono my-2"><code>${code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`
  );

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-[#E8E8E8] text-[#FF6B35] px-1 py-0.5 rounded text-xs font-mono">$1</code>');

  // Headers (process # after ## etc to avoid conflicts)
  html = html.replace(/^#### (.+)$/gm, '<h4 class="font-display font-semibold text-xs mt-3 mb-1">$1</h4>');
  html = html.replace(/^### (.+)$/gm, '<h3 class="font-display font-bold text-sm mt-4 mb-2">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="font-display font-bold text-base mt-5 mb-2 pb-1 border-b border-[#E8E8E8]">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 class="font-display font-bold text-xl leading-tight mt-4 mb-4 pb-2 border-b-2 border-[#FF6B35]/30">$1</h1>');

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#FF6B35] hover:underline" target="_blank" rel="noopener">$1</a>');

  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="rounded-xl max-w-full my-2" />');

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr class="my-4 border-[#E8E8E8]" />');

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-[#FF6B35] pl-4 py-1 my-2 text-[#636E72] italic">$1</blockquote>');

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-sm">$1</li>');
  html = html.replace(/(<li[^>]*>.*<\/li>\n?)+/g, '<ul class="my-2">$&</ul>');

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal text-sm">$1</li>');

  // Paragraphs (double newlines)
  html = html.replace(/\n\n+/g, '</p><p class="text-sm leading-relaxed my-2">');
  html = '<p class="text-sm leading-relaxed my-2">' + html + '</p>';

  // Clean up empty paragraphs and extra markup around blocks
  html = html.replace(/<p class="[^"]*"><\/p>/g, '');
  html = html.replace(/<p class="[^"]*">(\s*<h[1-4])/g, '$1');
  html = html.replace(/(<\/h[1-4]>)\s*<\/p>/g, '$1');
  html = html.replace(/<p class="[^"]*">(\s*<pre)/g, '$1');
  html = html.replace(/(<\/pre>)\s*<\/p>/g, '$1');
  html = html.replace(/<p class="[^"]*">(\s*<ul)/g, '$1');
  html = html.replace(/(<\/ul>)\s*<\/p>/g, '$1');
  html = html.replace(/<p class="[^"]*">(\s*<blockquote)/g, '$1');
  html = html.replace(/(<\/blockquote>)\s*<\/p>/g, '$1');
  html = html.replace(/<p class="[^"]*">(\s*<hr)/g, '$1');
  html = html.replace(/(<\/hr>)\s*<\/p>/g, '$1');

  return html;
}

export default function MarkdownEditor({
  value,
  onChange,
  placeholder = "Write here...",
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  const [viewMode, setViewMode] = useState<"split" | "edit" | "preview">("split");

  const html = useMemo(() => DOMPurify.sanitize(renderMarkdown(value), { ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.-]+(?:[^a-z+.-:]|$))/i }), [value]);

  const syncScroll = useCallback((e: React.UIEvent<HTMLTextAreaElement>) => {
    const editor = e.currentTarget;
    const preview = editor.parentElement?.nextElementSibling as HTMLElement | null;
    if (preview) {
      const ratio = editor.scrollTop / (editor.scrollHeight - editor.clientHeight);
      preview.scrollTop = ratio * (preview.scrollHeight - preview.clientHeight);
    }
  }, []);

  return (
    <div className={className}>
      {/* View mode toggle */}
      <div className="flex items-center justify-between mb-2">
        <div className="inline-flex bg-[#E8E8E8] rounded-lg p-0.5">
          {(["edit", "split", "preview"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setViewMode(m)}
              className={`px-3 py-1 text-xs font-display font-semibold rounded-md transition ${
                viewMode === m ? "bg-white shadow-sm text-[#2D3436]" : "text-[#636E72]"
              }`}
            >
              {m === "edit" ? "Edit" : m === "split" ? "Split" : "Preview"}
            </button>
          ))}
        </div>
        <span className="font-mono text-[10px] text-[#636E72]">{value.length.toLocaleString()} chars</span>
      </div>

      <div className={`flex ${viewMode === "split" ? "flex-row" : "flex-col"} gap-0 border border-[#E8E8E8] rounded-xl overflow-hidden bg-white`}>
        {/* Editor pane */}
        {(viewMode === "split" || viewMode === "edit") && (
          <div className={viewMode === "split" ? "w-1/2 border-r border-[#E8E8E8]" : "w-full"}>
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onScroll={viewMode === "split" ? syncScroll : undefined}
              placeholder={placeholder}
              className="w-full h-[380px] p-4 font-mono text-sm bg-[#FAFAFA] resize-none focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20 focus:bg-white transition"
            />
          </div>
        )}

        {/* Preview pane */}
        {(viewMode === "split" || viewMode === "preview") && (
          <div
            className={`${viewMode === "split" ? "w-1/2" : "w-full"} h-[380px] p-4 overflow-y-auto bg-white`}
          >
            {value.trim() ? (
              <div
                className="prose prose-sm max-w-none font-sans text-[#2D3436] markdown-body"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ) : (
              <p className="font-sans text-sm text-[#636E72] italic">Preview will appear here...</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
