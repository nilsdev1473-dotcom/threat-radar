"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Rss, ExternalLink } from "lucide-react";

interface LiveNewsItem {
  headline: string;
  source: string;
  url: string;
  timestamp: string;
  country: string;
  region: string;
}

interface ApiResponse {
  liveNews: LiveNewsItem[];
  lastUpdated: string;
}

const REGION_COLORS: Record<string, string> = {
  "Five Eyes": "#00B4FF",
  "Europe": "#FFB800",
  "Indo-Pacific": "#FF2D2D",
  "Middle East": "#FF6B00",
  "Global": "#888888",
};

function getRegionColor(region: string): string {
  return REGION_COLORS[region] ?? "#888888";
}

export default function LiveNewsFeed() {
  const [news, setNews] = useState<LiveNewsItem[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("/api/threats");
        if (res.ok) {
          const data: ApiResponse = await res.json();
          setNews(data.liveNews ?? []);
          setLastUpdated(data.lastUpdated ?? "");
        }
      } catch {
        // Fallback — API may fail during SSG
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
    const interval = setInterval(fetchNews, 120000); // Refresh every 2min
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="px-4 py-6">
        <div className="flex items-center gap-2 mb-4">
          <Rss size={14} className="text-[var(--accent)]" />
          <h2 className="mono text-xs font-bold text-[var(--accent)] uppercase tracking-wider">
            Live Intelligence Feed
          </h2>
        </div>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-lg bg-[var(--bg-surface)] animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (news.length === 0) return null;

  return (
    <div className="px-4 py-6 border-t border-[var(--border)]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Rss size={14} className="text-[var(--accent)]" />
          <h2 className="mono text-xs font-bold text-[var(--accent)] uppercase tracking-wider">
            Live Intelligence Feed
          </h2>
        </div>
        {lastUpdated && (
          <span className="mono text-[10px] text-[var(--text-muted)]">
            {new Date(lastUpdated).toLocaleTimeString()} UTC
          </span>
        )}
      </div>

      <div className="space-y-2 max-h-[300px] overflow-y-auto hide-scrollbar">
        {news.slice(0, 10).map((item, i) => {
          const regionColor = getRegionColor(item.region);
          return (
            <motion.a
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border)] hover:border-[var(--accent)] transition-all group cursor-pointer"
              style={{ borderLeft: `3px solid ${regionColor}` }}
            >
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[var(--text-primary)] leading-relaxed line-clamp-2 group-hover:text-[var(--accent)] transition-colors">
                  {item.headline}
                </p>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <span
                    className="mono text-[10px] hover:underline"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {item.source}
                  </span>
                  {item.country && (
                    <span className="mono text-[10px] text-[var(--text-muted)]">
                      • {item.country}
                    </span>
                  )}
                  {item.region && (
                    <span
                      className="mono text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase"
                      style={{
                        color: regionColor,
                        backgroundColor: regionColor + "26",
                      }}
                    >
                      {item.region}
                    </span>
                  )}
                </div>
              </div>
              <ExternalLink size={12} className="text-[var(--text-muted)] mt-1 shrink-0 group-hover:text-[var(--accent)] transition-colors" />
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
