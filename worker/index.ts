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

const ROUTE_SEO: Record<string, { titleDe: string; titleEn: string; descDe: string; descEn: string; keywords: string }> = {
  '/visitenkarten-qr-code': {
    titleDe: 'Visitenkarten QR-Code Generator',
    titleEn: 'Business Card QR Code Generator',
    descDe: 'Erstelle kostenlos einen QR-Code für deine Visitenkarte im vCard-Format. Name, Telefon, E-Mail, Adresse — alles in einem Scan.',
    descEn: 'Create a free QR code for your business card in vCard format. Name, phone, email, address — all in one scan.',
    keywords: 'visitenkarte qr code, vcard qr code, business card qr code, kontakt qr code',
  },
  '/link-qr-code': {
    titleDe: 'Link/URL QR-Code Generator',
    titleEn: 'Link/URL QR Code Generator',
    descDe: 'Erstelle kostenlos einen QR-Code für jede beliebige URL oder Website. Sofort scanbar, ohne Ablaufdatum.',
    descEn: 'Create a free QR code for any URL or website. Instantly scannable, no expiration.',
    keywords: 'url qr code, link qr code, website qr code, qr code erstellen',
  },
  '/google-bewertung-qr-code': {
    titleDe: 'Google Bewertung QR-Code Generator',
    titleEn: 'Google Review QR Code Generator',
    descDe: 'Erstelle einen QR-Code für deine Google-Bewertungsseite. Kunden scannen und bewerten sofort.',
    descEn: 'Create a QR code for your Google review page. Customers scan and review instantly.',
    keywords: 'google bewertung qr code, google review qr code, rezension qr code',
  },
  '/wifi-qr-code': {
    titleDe: 'WiFi QR-Code Generator',
    titleEn: 'WiFi QR Code Generator',
    descDe: 'Erstelle einen QR-Code für dein WLAN-Netzwerk. Gäste scannen und verbinden sich sofort — kein Passwort tippen.',
    descEn: 'Create a QR code for your WiFi network. Guests scan and connect instantly — no password typing.',
    keywords: 'wifi qr code, wlan qr code, netzwerk qr code, wifi passwort qr code',
  },
  '/email-qr-code': {
    titleDe: 'E-Mail QR-Code Generator',
    titleEn: 'Email QR Code Generator',
    descDe: 'Erstelle einen QR-Code der eine vorgefertigte E-Mail öffnet. Mit Empfänger, Betreff und Nachricht.',
    descEn: 'Create a QR code that opens a pre-filled email. With recipient, subject and message.',
    keywords: 'email qr code, mailto qr code, e-mail qr code erstellen',
  },
  '/sms-qr-code': {
    titleDe: 'SMS QR-Code Generator',
    titleEn: 'SMS QR Code Generator',
    descDe: 'Erstelle einen QR-Code der eine SMS mit vorgegebenem Text öffnet.',
    descEn: 'Create a QR code that opens an SMS with pre-filled text.',
    keywords: 'sms qr code, textnachricht qr code, sms qr code erstellen',
  },
  '/telefon-qr-code': {
    titleDe: 'Telefon QR-Code Generator',
    titleEn: 'Phone QR Code Generator',
    descDe: 'Erstelle einen QR-Code für eine Telefonnummer. Ein Scan startet den Anruf.',
    descEn: 'Create a QR code for a phone number. One scan starts the call.',
    keywords: 'telefon qr code, anruf qr code, phone qr code',
  },
  '/whatsapp-qr-code': {
    titleDe: 'WhatsApp QR-Code Generator',
    titleEn: 'WhatsApp QR Code Generator',
    descDe: 'Erstelle einen QR-Code der einen WhatsApp-Chat mit vorgefertigter Nachricht öffnet.',
    descEn: 'Create a QR code that opens a WhatsApp chat with a pre-filled message.',
    keywords: 'whatsapp qr code, wa qr code, whatsapp link qr code',
  },
  '/instagram-qr-code': {
    titleDe: 'Instagram QR-Code Generator',
    titleEn: 'Instagram QR Code Generator',
    descDe: 'Erstelle einen QR-Code für dein Instagram-Profil. Follower gewinnen mit einem Scan.',
    descEn: 'Create a QR code for your Instagram profile. Gain followers with one scan.',
    keywords: 'instagram qr code, insta qr code, instagram profil qr code',
  },
  '/tiktok-qr-code': {
    titleDe: 'TikTok QR-Code Generator',
    titleEn: 'TikTok QR Code Generator',
    descDe: 'Erstelle einen QR-Code für dein TikTok-Profil. Mehr Follower mit einem Scan.',
    descEn: 'Create a QR code for your TikTok profile. More followers with one scan.',
    keywords: 'tiktok qr code, tiktok profil qr code',
  },
  '/facebook-qr-code': {
    titleDe: 'Facebook QR-Code Generator',
    titleEn: 'Facebook QR Code Generator',
    descDe: 'Erstelle einen QR-Code für deine Facebook-Seite oder dein Profil.',
    descEn: 'Create a QR code for your Facebook page or profile.',
    keywords: 'facebook qr code, facebook seite qr code',
  },
  '/youtube-qr-code': {
    titleDe: 'YouTube QR-Code Generator',
    titleEn: 'YouTube QR Code Generator',
    descDe: 'Erstelle einen QR-Code für deinen YouTube-Kanal oder ein Video.',
    descEn: 'Create a QR code for your YouTube channel or video.',
    keywords: 'youtube qr code, youtube kanal qr code, video qr code',
  },
  '/linkedin-qr-code': {
    titleDe: 'LinkedIn QR-Code Generator',
    titleEn: 'LinkedIn QR Code Generator',
    descDe: 'Erstelle einen QR-Code für dein LinkedIn-Profil. Netzwerken leicht gemacht.',
    descEn: 'Create a QR code for your LinkedIn profile. Networking made easy.',
    keywords: 'linkedin qr code, linkedin profil qr code',
  },
  '/x-twitter-qr-code': {
    titleDe: 'X (Twitter) QR-Code Generator',
    titleEn: 'X (Twitter) QR Code Generator',
    descDe: 'Erstelle einen QR-Code für dein X/Twitter-Profil.',
    descEn: 'Create a QR code for your X/Twitter profile.',
    keywords: 'twitter qr code, x qr code, twitter profil qr code',
  },
  '/ean-13-barcode-generator': {
    titleDe: 'EAN-13 Barcode Generator mit Pr\u00fcfziffer',
    titleEn: 'EAN-13 Barcode Generator with Check Digit',
    descDe: 'Kostenloser EAN-13 Barcode Generator. Pr\u00fcfziffer automatisch berechnen, validieren und Schritt-f\u00fcr-Schritt erkl\u00e4rt. Als PNG oder SVG.',
    descEn: 'Free EAN-13 barcode generator. Auto-calculate check digit, validate, and step-by-step explanation. Download as PNG or SVG.',
    keywords: 'ean-13 generator, ean 13 barcode erstellen, ean pr\u00fcfziffer berechnen, ean-13 check digit',
  },
  '/ean-8-barcode-generator': {
    titleDe: 'EAN-8 Barcode Generator mit Pr\u00fcfziffer',
    titleEn: 'EAN-8 Barcode Generator with Check Digit',
    descDe: 'Kostenloser EAN-8 Barcode Generator f\u00fcr kleine Verpackungen. Mit Pr\u00fcfziffer-Berechnung und Erkl\u00e4rung.',
    descEn: 'Free EAN-8 barcode generator for small packages. With check digit calculation and explanation.',
    keywords: 'ean-8 generator, ean 8 barcode, ean-8 pr\u00fcfziffer, ean-8 check digit',
  },
  '/upc-a-barcode-generator': {
    titleDe: 'UPC-A Barcode Generator mit Pr\u00fcfziffer',
    titleEn: 'UPC-A Barcode Generator with Check Digit',
    descDe: 'Kostenloser UPC-A Barcode Generator. US-amerikanischer Produktbarcode mit automatischer Pr\u00fcfziffer.',
    descEn: 'Free UPC-A barcode generator. US product barcode with automatic check digit.',
    keywords: 'upc-a generator, upc barcode erstellen, upc-a check digit, upc pr\u00fcfziffer',
  },
  '/code-128-barcode-generator': {
    titleDe: 'Code 128 Barcode Generator',
    titleEn: 'Code 128 Barcode Generator',
    descDe: 'Kostenloser Code 128 Barcode Generator. F\u00fcr Logistik, Versand und Inventar. Alphanumerische Barcodes.',
    descEn: 'Free Code 128 barcode generator. For logistics, shipping and inventory. Alphanumeric barcodes.',
    keywords: 'code 128 generator, code128 barcode, code 128 erstellen, logistik barcode',
  },
  '/code-39-barcode-generator': {
    titleDe: 'Code 39 Barcode Generator',
    titleEn: 'Code 39 Barcode Generator',
    descDe: 'Kostenloser Code 39 Barcode Generator. Alphanumerischer Barcode f\u00fcr Industrie und Beh\u00f6rden.',
    descEn: 'Free Code 39 barcode generator. Alphanumeric barcode for industry and government.',
    keywords: 'code 39 generator, code39 barcode, code 39 erstellen, industrie barcode',
  },
  '/itf-14-barcode-generator': {
    titleDe: 'ITF-14 Barcode Generator mit Pr\u00fcfziffer',
    titleEn: 'ITF-14 Barcode Generator with Check Digit',
    descDe: 'Kostenloser ITF-14 Barcode Generator. F\u00fcr Versandkartons und Handelseinheiten mit Pr\u00fcfziffer.',
    descEn: 'Free ITF-14 barcode generator. For shipping cartons and trade units with check digit.',
    keywords: 'itf-14 generator, itf14 barcode, itf-14 erstellen, versandkarton barcode',
  },
};

function detectLanguage(request: Request): string {
  const acceptLang = request.headers.get('accept-language') || '';
  const supported = SUPPORTED_LANGS as readonly string[];
  const langs = acceptLang.split(',').map(l => l.split(';')[0].trim().split('-')[0].toLowerCase());
  for (const lang of langs) {
    if (supported.includes(lang)) return lang;
  }
  return 'de';
}

function getHreflangTags(path: string = '/'): string {
  const suffix = path === '/' ? '/' : path;
  return SUPPORTED_LANGS
    .map(l => `<link rel="alternate" hreflang="${l}" href="https://qrcode-no-abo.de${suffix}" />`)
    .join('\n  ') + `\n  <link rel="alternate" hreflang="x-default" href="https://qrcode-no-abo.de${suffix}" />`;
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

function getRoutePrerenderedHTML(path: string, lang: string): string {
  const routeSeo = ROUTE_SEO[path];
  if (!routeSeo) return '';

  const isEn = lang === 'en';
  const title = isEn ? routeSeo.titleEn : routeSeo.titleDe;
  const desc = isEn ? routeSeo.descEn : routeSeo.descDe;
  const fullTitle = `${title} \u2014 Kostenlos | qrcode-no-abo.de`;
  const hreflangTags = getHreflangTags(path);
  const canonicalUrl = `https://qrcode-no-abo.de${path}`;
  const homeLabel = isEn ? 'Home' : 'Startseite';

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${escapeHtml(desc)}">
  <meta name="keywords" content="${escapeHtml(routeSeo.keywords)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(desc)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="https://qrcode-no-abo.de/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(desc)}">
  <meta name="twitter:image" content="https://qrcode-no-abo.de/og-image.png">
  <link rel="canonical" href="${canonicalUrl}">
  ${hreflangTags}
  <title>${escapeHtml(fullTitle)}</title>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "${escapeHtml(title)}",
        "url": "${canonicalUrl}",
        "description": "${escapeHtml(desc)}",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Any",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "${homeLabel}",
            "item": "https://qrcode-no-abo.de/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "${escapeHtml(title)}",
            "item": "${canonicalUrl}"
          }
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
    nav.breadcrumb{max-width:900px;margin:1rem auto 0;padding:0 1rem;font-size:.9rem}
    nav.breadcrumb a{color:#7ec8e3;text-decoration:none}
    nav.breadcrumb span{color:#666}
    footer{background:#1a1a2e;color:#ccc;text-align:center;padding:2rem 1rem;margin-top:3rem;font-size:.85rem}
    footer p{margin:.25rem 0}
    footer a{color:#7ec8e3;text-decoration:none}
    footer nav{margin:.5rem 0}
    footer nav a{margin:0 .5rem}
  </style>
</head>
<body>
  <header>
    <h1>${escapeHtml(title)}</h1>
    <p>${escapeHtml(desc)}</p>
  </header>

  <nav class="breadcrumb">
    <a href="/">qrcode-no-abo.de</a> <span>\u203A</span> <span>${escapeHtml(title)}</span>
  </nav>

  <main>
    <h2>${escapeHtml(title)}</h2>
    <p>${escapeHtml(desc)}</p>
  </main>

  <footer>
    <p>qrcode-no-abo.de - Kostenloser QR-Code Generator</p>
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

    // Bot detection - serve pre-rendered HTML for root and route paths
    const userAgent = request.headers.get('user-agent') || '';
    if (isBot(userAgent)) {
      const path = url.pathname;
      if (path === '/') {
        const lang = detectLanguage(request);
        return new Response(getPrerenderedHTML(lang), {
          headers: {
            'Content-Type': 'text/html;charset=UTF-8',
            'Cache-Control': 'public, max-age=3600',
            'Vary': 'Accept-Language',
          },
        });
      }
      if (ROUTE_SEO[path]) {
        const lang = detectLanguage(request);
        return new Response(getRoutePrerenderedHTML(path, lang), {
          headers: {
            'Content-Type': 'text/html;charset=UTF-8',
            'Cache-Control': 'public, max-age=3600',
            'Vary': 'Accept-Language',
          },
        });
      }
    }

    // Normal users - serve React SPA via static assets
    // Inject hreflang tags into root and route pages for SEO
    if (url.pathname === '/' || ROUTE_SEO[url.pathname]) {
      const currentPath = url.pathname === '/' ? '/' : url.pathname;
      const suffix = currentPath === '/' ? '/' : currentPath;
      const response = await env.ASSETS.fetch(request);
      const hreflangHtml = SUPPORTED_LANGS
        .map(l => `<link rel="alternate" hreflang="${l}" href="https://qrcode-no-abo.de${suffix}" />`)
        .join('') + `<link rel="alternate" hreflang="x-default" href="https://qrcode-no-abo.de${suffix}" />`;

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
