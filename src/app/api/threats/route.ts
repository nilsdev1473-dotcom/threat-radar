import { NextResponse } from "next/server";
import { THREATS } from "@/lib/threats";

interface GdeltArticle {
  title?: string;
  url?: string;
  seendate?: string;
  domain?: string;
  sourcecountry?: string;
}

interface GdeltResponse {
  articles?: GdeltArticle[];
}

async function fetchGdeltConflicts(): Promise<GdeltArticle[]> {
  try {
    const url =
      "https://api.gdeltproject.org/api/v2/doc/doc?query=conflict%20military&mode=artlist&format=json&maxrecords=25&timespan=24h";
    const res = await fetch(url, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return [];
    const data: GdeltResponse = await res.json();
    return data.articles ?? [];
  } catch {
    return [];
  }
}

export async function GET() {
  const gdeltArticles = await fetchGdeltConflicts();

  const liveNews = gdeltArticles.slice(0, 20).map((a) => ({
    headline: a.title ?? "Untitled report",
    source: a.domain ?? "unknown",
    url: a.url ?? "",
    timestamp: a.seendate ?? new Date().toISOString(),
    country: a.sourcecountry ?? "",
  }));

  return NextResponse.json({
    threats: THREATS,
    liveNews,
    lastUpdated: new Date().toISOString(),
    sources: ["GDELT Project", "Internal Assessment"],
  });
}
