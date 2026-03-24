import { NextResponse } from "next/server";
import { THREATS } from "@/lib/threats";

interface GdeltArticle {
  title?: string;
  url?: string;
  seendate?: string;
  domain?: string;
  sourcecountry?: string;
  language?: string;
}

interface GdeltResponse {
  articles?: GdeltArticle[];
}

const REGION_MAP: Record<string, string> = {
  US: "Five Eyes",
  CA: "Five Eyes",
  GB: "Five Eyes",
  AU: "Five Eyes",
  NZ: "Five Eyes",
  UA: "Europe",
  RU: "Europe",
  BY: "Europe",
  PL: "Europe",
  RO: "Europe",
  DE: "Europe",
  FR: "Europe",
  CN: "Indo-Pacific",
  TW: "Indo-Pacific",
  JP: "Indo-Pacific",
  KR: "Indo-Pacific",
  PH: "Indo-Pacific",
  IL: "Middle East",
  IR: "Middle East",
  LB: "Middle East",
  SY: "Middle East",
  IQ: "Middle East",
  SA: "Middle East",
  YE: "Middle East",
};

function getRegion(countryCode: string): string {
  if (!countryCode) return "Global";
  const code = countryCode.trim().toUpperCase().slice(0, 2);
  return REGION_MAP[code] ?? "Global";
}

async function fetchGdeltConflicts(): Promise<GdeltArticle[]> {
  try {
    const url =
      "https://api.gdeltproject.org/api/v2/doc/doc?query=conflict%20military&mode=artlist&format=json&maxrecords=25&timespan=24h&sourcelang=eng";
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
    region: getRegion(a.sourcecountry ?? ""),
  }));

  return NextResponse.json({
    threats: THREATS,
    liveNews,
    lastUpdated: new Date().toISOString(),
    sources: ["GDELT Project", "Internal Assessment"],
  });
}
