"use client";

import { THREATS } from "@/lib/threats";

export default function NewsTicker() {
  const allNews = THREATS.flatMap((t) =>
    t.news.map((n) => `[${t.id}] ${n.headline}`)
  );
  const tickerText = allNews.join("  ///  ");

  return (
    <div className="w-full overflow-hidden bg-[var(--bg-surface)] border-b border-[var(--border)] py-2">
      <div className="flex whitespace-nowrap animate-scroll-left">
        <span className="mono text-xs text-[var(--text-secondary)] px-4">
          {tickerText}  ///  {tickerText}
        </span>
      </div>
    </div>
  );
}
