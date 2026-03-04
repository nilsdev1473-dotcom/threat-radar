Build a real-time global threat radar dashboard. Dark military aesthetic with 3D globe using Three.js, conflict zone markers for 12 active hotspots, threat feed panel with monospace green-on-black terminal style, DEFCON-style threat level indicator, filter by region and severity, clickable zones with detail cards, stats charts with Recharts, NATO base overlay toggle. Black/navy background, neon green and red accents, glassmorphism panels. Next.js 14, TypeScript, Tailwind CSS, Three.js, Recharts, Framer Motion. Deploy to Vercel.

CORE FEATURES:

1. Interactive 3D globe (Three.js or react-globe.gl) as the centerpiece. Dark theme with glowing country borders. Rotate, zoom, click on hotspots.

2. Threat zones rendered as pulsing red/orange/yellow circles on the globe based on severity (critical/high/medium/low). At least 12 pre-loaded active conflict zones (Ukraine, Gaza, Red Sea, South China Sea, Taiwan Strait, Sahel, Sudan, Myanmar, Syria, Somalia, Yemen, Korean Peninsula).

3. Side panel with real-time threat feed - scrolling list of alerts styled like a military terminal (monospace font, green-on-black aesthetic). Each alert has timestamp, location, severity badge, and description.

4. Top bar with global threat level indicator (DEFCON-style 1-5 scale), total active threats count, and last updated timestamp.

5. Filter controls: filter by region (Europe, Middle East, Asia-Pacific, Africa, Americas), severity level, and threat type (armed conflict, naval, cyber, aerospace, nuclear).

6. Click a threat zone on the globe to open a detail card with: threat summary, involved parties, estimated casualties, duration, NATO response status, and a mini timeline of recent events.

7. Stats dashboard below the globe: threat count by region (bar chart), severity distribution (donut chart), 30-day trend line, and top 5 most critical zones ranking.

8. Military assets overlay toggle: show approximate NATO base locations as blue dots, carrier strike group positions as ship icons.

DESIGN: Ultra-premium dark military aesthetic. Black/dark navy background, neon green and red accents, monospace fonts for data, smooth animations. Think Bloomberg Terminal meets Pentagon war room. Glassmorphism panels. Subtle grid background pattern.

TECH: Next.js 14, TypeScript, Tailwind CSS, Three.js or react-globe.gl for the 3D globe, Recharts for analytics charts, Framer Motion for animations. Use realistic mock data throughout. Deploy to Vercel.
