import { SEO_CONTENT, SUPPORTED_LANGS, type SeoContent } from './seo-translations';

interface Env {
  COUNTER: KVNamespace;
  ASSETS: Fetcher;
}

const BOT_AGENTS = [
  'googlebot', 'bingbot', 'yandexbot', 'duckduckbot', 'slurp', 'baiduspider',
  'facebookexternalhit', 'twitterbot', 'linkedinbot', 'whatsapp', 'telegrambot',
  'discordbot', 'pinterestbot', 'redditbot',
  'oai-searchbot', 'claudebot', 'perplexitybot', 'chatgpt', 'gptbot',
  'applebot', 'semrushbot', 'ahrefsbot', 'mj12bot',
];

function isBot(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return BOT_AGENTS.some(bot => ua.includes(bot));
}

function detectLanguage(request: Request): string {
  const acceptLang = request.headers.get('accept-language') || '';
  const supported = SUPPORTED_LANGS as readonly string[];
  const langs = acceptLang.split(',').map(l => l.split(';')[0].trim().split('-')[0].toLowerCase());
  for (const lang of langs) {
    if (supported.includes(lang)) return lang;
  }
  return 'de';
}

function getHreflangTags(): string {
  return SUPPORTED_LANGS
    .map(l => `<link rel="alternate" hreflang="${l}" href="https://qrcode-no-abo.de/" />`)
    .join('\n  ') + '\n  <link rel="alternate" hreflang="x-default" href="https://qrcode-no-abo.de/" />';
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function getPrerenderedHTML(lang: string): string {
  const content = SEO_CONTENT[lang] || SEO_CONTENT['de'];
  const hreflangTags = getHreflangTags();

  const featuresHtml = content.features.map(f =>
    `    <section>\n      <h3>${escapeHtml(f.title)}</h3>\n      <p>${escapeHtml(f.description)}</p>\n    </section>`
  ).join('\n\n');

  const faqsHtml = content.faqs.map(f =>
    `    <h3>${escapeHtml(f.q)}</h3>\n    <p>${escapeHtml(f.a)}</p>`
  ).join('\n\n');

  const faqJsonLd = content.faqs.map(f =>
    `{"@type": "Question", "name": ${JSON.stringify(f.q)}, "acceptedAnswer": {"@type": "Answer", "text": ${JSON.stringify(f.a)}}}`
  ).join(',\n          ');

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${escapeHtml(content.metaDescription)}">
  <meta name="keywords" content="QR-Code Generator, kostenlos, ohne Abo, Visitenkarte, vCard, WiFi QR-Code, Link QR-Code, QR Code erstellen, gratis">
  <meta property="og:title" content="${escapeHtml(content.h1)}">
  <meta property="og:description" content="${escapeHtml(content.metaDescription)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://qrcode-no-abo.de">
  <meta property="og:image" content="https://qrcode-no-abo.de/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(content.h1)}">
  <meta name="twitter:description" content="${escapeHtml(content.metaDescription)}">
  <meta name="twitter:image" content="https://qrcode-no-abo.de/og-image.png">
  <link rel="canonical" href="https://qrcode-no-abo.de/">
  ${hreflangTags}
  <title>${escapeHtml(content.title)}</title>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "QR-Code Generator",
        "url": "https://qrcode-no-abo.de",
        "description": "Kostenloser QR-Code Generator ohne Abo. 14 QR-Code Typen, 8 Rahmen-Templates.",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Any",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          ${faqJsonLd}
        ]
      }
    ]
  }
  </script>

  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;line-height:1.6;color:#1a1a2e;background:#f8f9fa}
    header{background:linear-gradient(135deg,#1a1a2e 0%,#16213e 100%);color:#fff;text-align:center;padding:3rem 1rem}
    header h1{font-size:2rem;margin-bottom:.5rem}
    header p{opacity:.85;max-width:600px;margin:.25rem auto}
    main{max-width:900px;margin:2rem auto;padding:0 1rem}
    main h2{font-size:1.5rem;margin:2rem 0 1rem;color:#1a1a2e}
    main h3{font-size:1.1rem;margin:1rem 0 .25rem;color:#16213e}
    section{margin-bottom:1rem;padding:1rem;background:#fff;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,.08)}
    section p{color:#444}
    ul{list-style:none;display:flex;flex-wrap:wrap;gap:.5rem;padding:1rem 0}
    ul li{background:#e8f0fe;padding:.4rem .8rem;border-radius:20px;font-size:.9rem;color:#1a1a2e}
    footer{background:#1a1a2e;color:#ccc;text-align:center;padding:2rem 1rem;margin-top:3rem;font-size:.85rem}
    footer p{margin:.25rem 0}
    footer a{color:#7ec8e3;text-decoration:none}
    footer nav{margin:.5rem 0}
    footer nav a{margin:0 .5rem}
  </style>
</head>
<body>
  <header>
    <h1>${escapeHtml(content.h1)}</h1>
    <p>${escapeHtml(content.subtitle)}</p>
    <p>${escapeHtml(content.headerDesc)}</p>
  </header>

  <main>
    <h2>${escapeHtml(content.sectionTitle)}</h2>
    <p>${escapeHtml(content.sectionSubtitle)}</p>

${featuresHtml}

    <h3>Features</h3>
    <ul>
      <li>14 QR-Code Typen</li>
      <li>8 Rahmen-Templates</li>
      <li>PNG, SVG, EPS, JPEG Export</li>
      <li>100% im Browser</li>
      <li>Kein Tracking</li>
      <li>Open Source</li>
      <li>Logo in QR-Code einbetten</li>
      <li>Farbw\u00e4hler mit 7 Paletten</li>
      <li>25 Sprachen</li>
      <li>Visitenkarten als JSON speichern/laden</li>
      <li>VCF Export f\u00fcr Outlook</li>
      <li>Google Bewertung QR-Codes f\u00fcr Restaurants und Gesch\u00e4fte</li>
    </ul>
  </main>

  <section style="max-width:900px;margin:0 auto 2rem;padding:0 1rem">
    <h2>${escapeHtml(content.faqTitle)}</h2>

${faqsHtml}
  </section>

  <footer>
    <p>qrcode-no-abo.de - Kostenloser QR-Code Generator</p>
    <p>${escapeHtml(content.footerText)}</p>
    <p><a href="https://github.com/Baha0077/qrcode-no-abo">Open Source auf GitHub</a></p>
    <nav>
      <a href="#impressum">Impressum</a>
      <a href="#datenschutz">Datenschutz</a>
    </nav>
    <p>\u00a9 2026 Bahadir Erg\u00fcll\u00fc - Voisweg 5c, 40878 Ratingen</p>
  </footer>
</body>
</html>`;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };

    // API endpoints first (before bot check)

    // Stats API: GET /api/stats - get all stats
    if (url.pathname === '/api/stats' && request.method === 'GET') {
      const [qrCount, visitors] = await Promise.all([
        env.COUNTER.get('total'),
        env.COUNTER.get('visitors'),
      ]);
      return new Response(JSON.stringify({
        qrCodes: parseInt(qrCount || '0', 10),
        visitors: parseInt(visitors || '0', 10),
      }), { headers });
    }

    // Counter API: GET /api/counter - get QR count
    if (url.pathname === '/api/counter' && request.method === 'GET') {
      const count = await env.COUNTER.get('total') || '0';
      return new Response(JSON.stringify({ count: parseInt(count, 10) }), { headers });
    }

    // Counter API: POST /api/counter - increment QR count
    if (url.pathname === '/api/counter' && request.method === 'POST') {
      const current = parseInt(await env.COUNTER.get('total') || '0', 10);
      const next = current + 1;
      await env.COUNTER.put('total', String(next));
      return new Response(JSON.stringify({ count: next }), { headers });
    }

    // Visitor API: POST /api/visitor - increment visitor count (called once per session)
    if (url.pathname === '/api/visitor' && request.method === 'POST') {
      const current = parseInt(await env.COUNTER.get('visitors') || '0', 10);
      const next = current + 1;
      await env.COUNTER.put('visitors', String(next));
      return new Response(JSON.stringify({ count: next }), { headers });
    }

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // Bot detection - serve pre-rendered HTML for root path
    const userAgent = request.headers.get('user-agent') || '';
    if (url.pathname === '/' && isBot(userAgent)) {
      const lang = detectLanguage(request);
      return new Response(getPrerenderedHTML(lang), {
        headers: {
          'Content-Type': 'text/html;charset=UTF-8',
          'Cache-Control': 'public, max-age=3600',
          'Vary': 'Accept-Language',
        },
      });
    }

    // Normal users - serve React SPA via static assets
    // Inject hreflang tags into root page for SEO
    if (url.pathname === '/') {
      const response = await env.ASSETS.fetch(request);
      const hreflangHtml = SUPPORTED_LANGS
        .map(l => `<link rel="alternate" hreflang="${l}" href="https://qrcode-no-abo.de/" />`)
        .join('') + '<link rel="alternate" hreflang="x-default" href="https://qrcode-no-abo.de/" />';

      return new HTMLRewriter()
        .on('head', {
          element(element) {
            element.append(hreflangHtml, { html: true });
          }
        })
        .transform(response);
    }

    return env.ASSETS.fetch(request);
  },
};
