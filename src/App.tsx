import { useState, useRef, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  QrCode, Download, Copy, User, Mail, Phone, Building, MapPin,
  Globe, Linkedin, FileText, Link, Upload, X, Shield, Smartphone,
  CheckCircle2, Zap, Lock, FileDown, FileUp, Wifi, MessageSquare,
  ChevronDown, ArrowLeft, Coffee, MessageCircle, Palette
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

type TabType = 'visitenkarte' | 'link' | 'google-review' | 'wifi' | 'email' | 'sms' | 'telefon' | 'whatsapp' | 'instagram' | 'tiktok' | 'facebook' | 'youtube' | 'linkedin' | 'twitter';

interface BusinessCardData {
  vorname: string;
  nachname: string;
  position: string;
  firma: string;
  email: string;
  telefon: string;
  mobil: string;
  website: string;
  adresse: string;
  plz: string;
  ort: string;
  linkedin: string;
  notizen: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────


const EMPTY_FORM: BusinessCardData = {
  vorname: '', nachname: '', position: '', firma: '',
  email: '', telefon: '', mobil: '', website: '',
  adresse: '', plz: '', ort: '', linkedin: '', notizen: ''
};


// ─── Brand Icons ──────────────────────────────────────────────────────────

const InstagramIcon = ({ large }: { large?: boolean }) => {
  const cls = large ? 'w-8 h-8' : 'w-4 h-4';
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#ig-grad)" strokeWidth="2"/>
      <circle cx="12" cy="12" r="5" stroke="url(#ig-grad)" strokeWidth="2"/>
      <circle cx="17.5" cy="6.5" r="1.5" fill="url(#ig-grad)"/>
      <defs>
        <linearGradient id="ig-grad" x1="2" y1="22" x2="22" y2="2">
          <stop stopColor="#FFDC80"/>
          <stop offset="0.5" stopColor="#F77737"/>
          <stop offset="1" stopColor="#C13584"/>
        </linearGradient>
      </defs>
    </svg>
  );
};

const TikTokIcon = ({ large }: { large?: boolean }) => {
  const cls = large ? 'w-8 h-8' : 'w-4 h-4';
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.17a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.6z"/>
    </svg>
  );
};

const FacebookIcon = ({ large }: { large?: boolean }) => {
  const cls = large ? 'w-8 h-8' : 'w-4 h-4';
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="#1877F2">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
};

const YouTubeIcon = ({ large }: { large?: boolean }) => {
  const cls = large ? 'w-8 h-8' : 'w-4 h-4';
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="#FF0000">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
};

const LinkedInIcon = ({ large }: { large?: boolean }) => {
  const cls = large ? 'w-8 h-8' : 'w-4 h-4';
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="#0A66C2">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
};

const GoogleIcon = ({ large }: { large?: boolean }) => (
  <svg className={large ? "w-8 h-8" : "w-4 h-4"} viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const XIcon = ({ large }: { large?: boolean }) => {
  const cls = large ? 'w-8 h-8' : 'w-4 h-4';
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
};

const FAQ_DATA = [
  { question: 'Ist der QR-Code Generator wirklich kostenlos?', answer: 'Ja, 100% kostenlos. Kein Abo, keine versteckten Kosten, keine Registrierung erforderlich.' },
  { question: 'Werden meine Daten gespeichert?', answer: 'Nein. Alle Daten werden ausschließlich in Ihrem Browser verarbeitet. Es werden keine Daten an einen Server übertragen.' },
  { question: 'Laufen die QR-Codes ab?', answer: 'Nein. Die erstellten QR-Codes sind statisch und funktionieren dauerhaft - ohne Ablaufdatum.' },
  { question: 'Welche Formate kann ich herunterladen?', answer: 'PNG, SVG, EPS und JPEG. Alle Formate sind druckfähig und kostenlos.' },
  { question: 'Kann ich ein Logo in den QR-Code einbetten?', answer: 'Ja. Laden Sie Ihr eigenes Logo hoch - es wird automatisch in der Mitte des QR-Codes eingebettet.' },
  { question: 'Sind die QR-Codes für kommerzielle Nutzung geeignet?', answer: 'Ja. Alle erstellten QR-Codes dürfen frei und ohne Einschränkungen verwendet werden, auch kommerziell.' },
  { question: 'Was ist ein vCard QR-Code?', answer: 'Ein vCard QR-Code enthält Kontaktdaten (Name, Telefon, E-Mail, etc.). Beim Scannen können die Daten direkt ins Adressbuch importiert werden.' },
  { question: 'Wie groß sollte ein QR-Code gedruckt werden?', answer: 'Mindestens 2 x 2 cm. Für bessere Scanbarkeit empfehlen wir 3-5 cm. Der Generator berechnet die optimale Auflösung automatisch.' },
  { question: 'Wie erstelle ich einen QR-Code für Google Bewertungen?', answer: 'Suchen Sie Ihr Geschäft auf Google Maps, klicken Sie auf "Teilen" und kopieren Sie den Link. Fügen Sie diesen Link im Tab "Google Bewertung" ein. Der QR-Code führt Kunden direkt zur Bewertungsseite Ihres Unternehmens.' },
];

// ─── Structured Data (hardcoded, no user input - safe for innerHTML) ────────

const STRUCTURED_DATA_JSON = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "QR-Code Generator",
      "url": "https://qrcode-no-abo.de",
      "description": "Kostenloser QR-Code Generator ohne Abo. Erstelle QR-Codes für Links, Visitenkarten, WiFi, E-Mail und mehr.",
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "EUR"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": FAQ_DATA.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }
  ]
});

// ─── Frame Types ────────────────────────────────────────────────────────────

interface FrameDefinition {
  id: string;
  name: string;
  hasText: boolean;
  preview: React.ReactNode;
}

function FramePreview({ type, color }: { type: string; color?: string }) {
  const c = color || '#dc2626';
  const qrPlaceholder = <rect x="18" y="18" width="24" height="24" rx="2" fill="#d1d5db" />;

  switch (type) {
    case 'none':
      return (
        <svg viewBox="0 0 60 60" className="w-full h-full">
          {qrPlaceholder}
        </svg>
      );
    case 'simple':
      return (
        <svg viewBox="0 0 60 80" className="w-full h-full">
          <rect x="4" y="4" width="52" height="60" rx="6" fill="white" stroke={c} strokeWidth="2" />
          <rect x="14" y="10" width="32" height="32" rx="2" fill="#d1d5db" />
          <text x="30" y="56" textAnchor="middle" fontSize="7" fontWeight="bold" fill={c}>SCAN ME</text>
        </svg>
      );
    case 'bold':
      return (
        <svg viewBox="0 0 60 80" className="w-full h-full">
          <rect x="3" y="3" width="54" height="58" rx="6" fill="white" stroke={c} strokeWidth="4" />
          <rect x="14" y="10" width="32" height="32" rx="2" fill="#d1d5db" />
          <rect x="10" y="50" width="40" height="14" rx="4" fill={c} />
          <text x="30" y="60" textAnchor="middle" fontSize="7" fontWeight="bold" fill="white">SCAN ME</text>
        </svg>
      );
    case 'circle':
      return (
        <svg viewBox="0 0 60 80" className="w-full h-full">
          <circle cx="30" cy="30" r="24" fill="none" stroke={c} strokeWidth="2.5" />
          <rect x="16" y="16" width="28" height="28" rx="2" fill="#d1d5db" />
          <text x="30" y="68" textAnchor="middle" fontSize="7" fontWeight="bold" fill={c}>SCAN ME</text>
        </svg>
      );
    case 'phone':
      return (
        <svg viewBox="0 0 60 80" className="w-full h-full">
          <rect x="12" y="3" width="36" height="62" rx="6" fill="none" stroke={c} strokeWidth="2" />
          <rect x="24" y="6" width="12" height="3" rx="1.5" fill={c} />
          <rect x="18" y="14" width="24" height="24" rx="1" fill="#d1d5db" />
          <circle cx="30" cy="55" r="4" fill="none" stroke={c} strokeWidth="1.5" />
          <text x="30" y="76" textAnchor="middle" fontSize="7" fontWeight="bold" fill={c}>SCAN ME</text>
        </svg>
      );
    case 'phone-dark':
      return (
        <svg viewBox="0 0 60 80" className="w-full h-full">
          <rect x="12" y="3" width="36" height="62" rx="6" fill={c} stroke={c} strokeWidth="2" />
          <rect x="24" y="6" width="12" height="3" rx="1.5" fill="white" opacity="0.5" />
          <rect x="16" y="12" width="28" height="28" rx="1" fill="white" />
          <rect x="20" y="16" width="20" height="20" rx="1" fill="#d1d5db" />
          <circle cx="30" cy="55" r="4" fill="none" stroke="white" strokeWidth="1.5" opacity="0.7" />
          <text x="30" y="76" textAnchor="middle" fontSize="7" fontWeight="bold" fill={c}>SCAN ME</text>
        </svg>
      );
    case 'clipboard':
      return (
        <svg viewBox="0 0 60 80" className="w-full h-full">
          <rect x="6" y="12" width="48" height="55" rx="4" fill="white" stroke={c} strokeWidth="2" />
          <rect x="20" y="4" width="20" height="16" rx="3" fill={c} />
          <circle cx="30" cy="10" r="3" fill="white" />
          <rect x="16" y="22" width="28" height="28" rx="2" fill="#d1d5db" />
          <text x="30" y="60" textAnchor="middle" fontSize="7" fontWeight="bold" fill={c}>SCAN ME</text>
        </svg>
      );
    case 'tablet':
      return (
        <svg viewBox="0 0 70 60" className="w-full h-full">
          <rect x="3" y="5" width="58" height="45" rx="4" fill="none" stroke={c} strokeWidth="2.5" />
          <rect x="61" y="20" width="2" height="8" rx="1" fill={c} />
          <rect x="18" y="10" width="28" height="28" rx="2" fill="#d1d5db" />
          <circle cx="10" cy="27" r="2.5" fill="none" stroke={c} strokeWidth="1.2" />
        </svg>
      );
    default:
      return null;
  }
}

const FRAMES: FrameDefinition[] = [
  { id: 'none', name: 'Ohne', hasText: false, preview: <FramePreview type="none" /> },
  { id: 'simple', name: 'Einfach', hasText: true, preview: <FramePreview type="simple" /> },
  { id: 'bold', name: 'Fett', hasText: true, preview: <FramePreview type="bold" /> },
  { id: 'circle', name: 'Kreis', hasText: true, preview: <FramePreview type="circle" /> },
  { id: 'phone', name: 'Handy', hasText: true, preview: <FramePreview type="phone" /> },
  { id: 'phone-dark', name: 'Handy Dunkel', hasText: true, preview: <FramePreview type="phone-dark" /> },
  { id: 'clipboard', name: 'Klemmbrett', hasText: true, preview: <FramePreview type="clipboard" /> },
  { id: 'tablet', name: 'Tablet', hasText: false, preview: <FramePreview type="tablet" /> },
];

// ─── Frame Selector Component ───────────────────────────────────────────────

function FrameSelector({
  selectedFrame,
  setSelectedFrame,
  frameText,
  setFrameText,
}: {
  selectedFrame: string;
  setSelectedFrame: (id: string) => void;
  frameText: string;
  setFrameText: (text: string) => void;
}) {
  const activeFrame = FRAMES.find(f => f.id === selectedFrame);
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">QR-Code Rahmen</label>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
        {FRAMES.map(frame => (
          <button
            key={frame.id}
            onClick={() => setSelectedFrame(frame.id)}
            className={`flex-shrink-0 w-20 p-2 rounded-lg border-2 transition-all cursor-pointer ${
              selectedFrame === frame.id
                ? 'border-red-500 bg-red-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="w-full aspect-[3/4] flex items-center justify-center">
              {frame.preview}
            </div>
            <p className="text-[10px] text-gray-500 text-center mt-1 truncate">{frame.name}</p>
          </button>
        ))}
      </div>
      {selectedFrame !== 'none' && activeFrame?.hasText && (
        <div className="mt-3">
          <label className="block text-xs font-medium text-gray-700 mb-1">Rahmen-Text</label>
          <input
            type="text"
            value={frameText}
            onChange={(e) => setFrameText(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
            placeholder="SCAN ME"
          />
        </div>
      )}
    </div>
  );
}

// ─── QR With Frame Component ────────────────────────────────────────────────

function QRWithFrame({
  qrRef,
  qrValue,
  qrSize,
  qrColor,
  qrLevel,
  imageSettings,
  frameName,
  frameText,
}: {
  qrRef: React.RefObject<HTMLDivElement | null>;
  qrValue: string;
  qrSize: number;
  qrColor: string;
  qrLevel: string;
  imageSettings?: {
    src: string;
    x: undefined;
    y: undefined;
    height: number;
    width: number;
    excavate: boolean;
  };
  frameName: string;
  frameText: string;
}) {
  const size = qrSize;
  const color = qrColor;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = qrRef as any;

  const qrElement = (
    <QRCodeSVG
      value={qrValue}
      size={size}
      fgColor={color}
      level={qrLevel as 'L' | 'M' | 'Q' | 'H'}
      includeMargin={true}
      imageSettings={imageSettings}
    />
  );

  if (frameName === 'none') {
    return (
      <div ref={ref} className="bg-gray-50 rounded-xl p-3 inline-block border border-gray-100">
        {qrElement}
      </div>
    );
  }

  const pad = 20;
  const textH = frameText ? 30 : 0;

  const renderFrame = () => {
    switch (frameName) {
      case 'simple': {
        const w = size + pad * 2;
        const h = size + pad + 15 + textH;
        return (
          <div ref={ref} className="inline-block">
            <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width={w - 4} height={h - 4} rx="12" fill="white" stroke={color} strokeWidth="3" />
              <foreignObject x={pad} y={15} width={size} height={size}>
                <div>{qrElement}</div>
              </foreignObject>
              {frameText && (
                <text x={w / 2} y={size + 15 + textH - 8} textAnchor="middle" fontSize="16" fontWeight="bold" fill={color} fontFamily="Arial, sans-serif">
                  {frameText}
                </text>
              )}
            </svg>
          </div>
        );
      }
      case 'bold': {
        const w = size + pad * 2;
        const badgeH = frameText ? 32 : 0;
        const h = size + pad + 20 + badgeH;
        return (
          <div ref={ref} className="inline-block">
            <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width={w - 6} height={h - 6} rx="12" fill="white" stroke={color} strokeWidth="5" />
              <foreignObject x={pad} y={15} width={size} height={size}>
                <div>{qrElement}</div>
              </foreignObject>
              {frameText && (
                <>
                  <rect x={w / 2 - 60} y={size + 20} width={120} height={28} rx="8" fill={color} />
                  <text x={w / 2} y={size + 39} textAnchor="middle" fontSize="14" fontWeight="bold" fill="white" fontFamily="Arial, sans-serif">
                    {frameText}
                  </text>
                </>
              )}
            </svg>
          </div>
        );
      }
      case 'circle': {
        const radius = size / 2 + 5;
        const cx = radius + 10;
        const cy = radius + 10;
        const w = (radius + 10) * 2;
        const h = w + (frameText ? textH : 0);
        return (
          <div ref={ref} className="inline-block">
            <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} xmlns="http://www.w3.org/2000/svg">
              <rect width={w} height={h} fill="white" />
              <circle cx={cx} cy={cy} r={radius + 3} fill="none" stroke={color} strokeWidth="3" />
              <defs>
                <clipPath id="circle-clip">
                  <circle cx={cx} cy={cy} r={radius} />
                </clipPath>
              </defs>
              <foreignObject x={cx - size / 2} y={cy - size / 2} width={size} height={size} clipPath="url(#circle-clip)">
                <div>{qrElement}</div>
              </foreignObject>
              {frameText && (
                <text x={w / 2} y={w + textH - 8} textAnchor="middle" fontSize="16" fontWeight="bold" fill={color} fontFamily="Arial, sans-serif">
                  {frameText}
                </text>
              )}
            </svg>
          </div>
        );
      }
      case 'phone': {
        const phoneW = size + 40;
        const phoneH = size + 80;
        const w = phoneW + 20;
        const h = phoneH + (frameText ? textH + 10 : 10);
        const cx = w / 2;
        return (
          <div ref={ref} className="inline-block">
            <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} xmlns="http://www.w3.org/2000/svg">
              <rect width={w} height={h} fill="white" />
              <rect x={10} y={5} width={phoneW} height={phoneH} rx="20" fill="none" stroke={color} strokeWidth="3" />
              <rect x={cx - 20} y={14} width={40} height={5} rx="2.5" fill={color} />
              <foreignObject x={30} y={35} width={size} height={size}>
                <div>{qrElement}</div>
              </foreignObject>
              <circle cx={cx} cy={phoneH - 12} r="10" fill="none" stroke={color} strokeWidth="2" />
              {frameText && (
                <text x={cx} y={phoneH + textH} textAnchor="middle" fontSize="16" fontWeight="bold" fill={color} fontFamily="Arial, sans-serif">
                  {frameText}
                </text>
              )}
            </svg>
          </div>
        );
      }
      case 'phone-dark': {
        const phoneW = size + 40;
        const phoneH = size + 80;
        const w = phoneW + 20;
        const h = phoneH + (frameText ? textH + 10 : 10);
        const cx = w / 2;
        return (
          <div ref={ref} className="inline-block">
            <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} xmlns="http://www.w3.org/2000/svg">
              <rect width={w} height={h} fill="white" />
              <rect x={10} y={5} width={phoneW} height={phoneH} rx="20" fill={color} />
              <rect x={cx - 20} y={14} width={40} height={5} rx="2.5" fill="white" opacity="0.5" />
              <rect x={22} y={30} width={size + 16} height={size + 16} rx="4" fill="white" />
              <foreignObject x={30} y={38} width={size} height={size}>
                <div>{qrElement}</div>
              </foreignObject>
              <circle cx={cx} cy={phoneH - 12} r="10" fill="none" stroke="white" strokeWidth="2" opacity="0.7" />
              {frameText && (
                <text x={cx} y={phoneH + textH} textAnchor="middle" fontSize="16" fontWeight="bold" fill={color} fontFamily="Arial, sans-serif">
                  {frameText}
                </text>
              )}
            </svg>
          </div>
        );
      }
      case 'clipboard': {
        const boardW = size + 40;
        const boardH = size + 60 + (frameText ? textH : 0);
        const w = boardW + 10;
        const h = boardH + 25;
        const cx = w / 2;
        return (
          <div ref={ref} className="inline-block">
            <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} xmlns="http://www.w3.org/2000/svg">
              <rect width={w} height={h} fill="white" />
              <rect x={5} y={20} width={boardW} height={boardH} rx="8" fill="white" stroke={color} strokeWidth="3" />
              <rect x={cx - 30} y={5} width={60} height={30} rx="6" fill={color} />
              <circle cx={cx} cy={15} r="6" fill="white" />
              <foreignObject x={25} y={40} width={size} height={size}>
                <div>{qrElement}</div>
              </foreignObject>
              {frameText && (
                <text x={cx} y={size + 40 + textH + 5} textAnchor="middle" fontSize="16" fontWeight="bold" fill={color} fontFamily="Arial, sans-serif">
                  {frameText}
                </text>
              )}
            </svg>
          </div>
        );
      }
      case 'tablet': {
        const tabW = size + 60;
        const tabH = size + 30;
        const w = tabW + 20;
        const h = tabH + 16;
        return (
          <div ref={ref} className="inline-block">
            <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} xmlns="http://www.w3.org/2000/svg">
              <rect width={w} height={h} fill="white" />
              <rect x={3} y={5} width={tabW} height={tabH} rx="8" fill="none" stroke={color} strokeWidth="3" />
              <rect x={tabW + 3} y={tabH / 2 - 8} width={4} height={16} rx="2" fill={color} />
              <foreignObject x={30} y={20} width={size} height={size}>
                <div>{qrElement}</div>
              </foreignObject>
              <circle cx={14} cy={tabH / 2 + 5} r="5" fill="none" stroke={color} strokeWidth="1.5" />
            </svg>
          </div>
        );
      }
      default:
        return (
          <div ref={ref} className="bg-gray-50 rounded-xl p-3 inline-block border border-gray-100">
            {qrElement}
          </div>
        );
    }
  };

  return renderFrame();
}

// ─── Download Helpers for Frames ────────────────────────────────────────────

function handleDownloadFramePNG(
  ref: React.RefObject<HTMLDivElement | null>,
  filename: string,
  scaleFactor: number
) {
  const container = ref.current;
  if (!container) return;
  const svgElement = container.querySelector(':scope > svg') as SVGSVGElement | null;
  if (!svgElement) {
    const innerSvg = container.querySelector('svg');
    if (innerSvg) {
      const clonedSvg = innerSvg.cloneNode(true) as SVGSVGElement;
      const origW = parseInt(innerSvg.getAttribute('width') || '256');
      const origH = parseInt(innerSvg.getAttribute('height') || '256');
      const pw = origW * scaleFactor;
      const ph = origH * scaleFactor;
      clonedSvg.setAttribute('width', String(pw));
      clonedSvg.setAttribute('height', String(ph));
      const svgData = new XMLSerializer().serializeToString(clonedSvg);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = pw;
        canvas.height = ph;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, pw, ph);
        ctx.drawImage(img, 0, 0, pw, ph);
        canvas.toBlob((blob) => {
          if (blob) {
            const downloadUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = filename;
            link.click();
            URL.revokeObjectURL(downloadUrl);
          }
        }, 'image/png');
        URL.revokeObjectURL(url);
      };
      img.src = url;
    }
    return;
  }

  const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement;
  const origW = parseFloat(svgElement.getAttribute('width') || '300');
  const origH = parseFloat(svgElement.getAttribute('height') || '300');
  const pw = Math.round(origW * scaleFactor);
  const ph = Math.round(origH * scaleFactor);
  clonedSvg.setAttribute('width', String(pw));
  clonedSvg.setAttribute('height', String(ph));

  const svgData = new XMLSerializer().serializeToString(clonedSvg);
  const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = pw;
    canvas.height = ph;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, pw, ph);
    ctx.drawImage(img, 0, 0, pw, ph);
    canvas.toBlob((blob) => {
      if (blob) {
        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(downloadUrl);
      }
    }, 'image/png');
    URL.revokeObjectURL(url);
  };
  img.src = url;
}

function handleDownloadFrameSVG(
  ref: React.RefObject<HTMLDivElement | null>,
  filename: string
) {
  const container = ref.current;
  if (!container) return;
  const svgElement = container.querySelector(':scope > svg') as SVGSVGElement | null;
  const targetSvg = svgElement || container.querySelector('svg');
  if (!targetSvg) return;

  const clonedSvg = targetSvg.cloneNode(true) as SVGSVGElement;
  const svgData = new XMLSerializer().serializeToString(clonedSvg);
  const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

// ─── Color Picker Modal ─────────────────────────────────────────────────────

function ColorPickerModal({ color, onChange, onClose }: { color: string; onChange: (c: string) => void; onClose: () => void }) {
  const [tempColor, setTempColor] = useState(color);
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);

  // Parse initial color to HSL on mount
  useEffect(() => {
    const r = parseInt(tempColor.slice(1, 3), 16) / 255;
    const g = parseInt(tempColor.slice(3, 5), 16) / 255;
    const b = parseInt(tempColor.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
      else if (max === g) h = ((b - r) / d + 2) / 6;
      else h = ((r - g) / d + 4) / 6;
    }
    setHue(Math.round(h * 360));
    setSaturation(Math.round(s * 100));
    setLightness(Math.round(l * 100));
  }, []);

  // HSL to Hex conversion
  const hslToHex = (h: number, s: number, l: number): string => {
    s /= 100;
    l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const updateFromHSL = (h: number, s: number, l: number) => {
    setHue(h);
    setSaturation(s);
    setLightness(l);
    setTempColor(hslToHex(h, s, l));
  };

  const recalcHSL = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
      else if (max === g) h = ((b - r) / d + 2) / 6;
      else h = ((r - g) / d + 4) / 6;
    }
    setHue(Math.round(h * 360));
    setSaturation(Math.round(s * 100));
    setLightness(Math.round(l * 100));
  };

  // Themed color palettes
  const PALETTES = [
    { name: 'Klassisch', colors: ['#000000', '#333333', '#555555', '#777777', '#999999'] },
    { name: 'Rot & Warm', colors: ['#dc2626', '#ef4444', '#f97316', '#ea580c', '#b91c1c', '#9a3412'] },
    { name: 'Blau & Cool', colors: ['#1d4ed8', '#2563eb', '#3b82f6', '#0284c7', '#0369a1', '#1e40af'] },
    { name: 'Grün & Natur', colors: ['#16a34a', '#15803d', '#166534', '#4ade80', '#059669', '#047857'] },
    { name: 'Lila & Kreativ', colors: ['#7c3aed', '#8b5cf6', '#a855f7', '#6d28d9', '#9333ea', '#c026d3'] },
    { name: 'Dunkel & Elegant', colors: ['#0f172a', '#1e293b', '#1a1a2e', '#16213e', '#0f3460', '#264653'] },
    { name: 'Business', colors: ['#1e3a5f', '#2c5282', '#2b6cb0', '#0d47a1', '#283593', '#1565c0'] },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-lg">Farbe wählen</h3>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Preview */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl border-2 border-gray-200 shadow-lg" style={{ backgroundColor: tempColor }} />
            <div className="flex-1">
              <input
                type="text"
                value={tempColor.toUpperCase()}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                    setTempColor(val);
                    if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
                      recalcHSL(val);
                    }
                  }
                }}
                maxLength={7}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Hue Slider - Rainbow gradient */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Farbton</label>
            <input
              type="range"
              min="0"
              max="360"
              value={hue}
              onChange={(e) => updateFromHSL(parseInt(e.target.value), saturation, lightness)}
              className="w-full h-3 rounded-full appearance-none cursor-pointer color-slider"
              style={{
                background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)',
              }}
            />
          </div>

          {/* Saturation Slider */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Sättigung</label>
            <input
              type="range"
              min="0"
              max="100"
              value={saturation}
              onChange={(e) => updateFromHSL(hue, parseInt(e.target.value), lightness)}
              className="w-full h-3 rounded-full appearance-none cursor-pointer color-slider"
              style={{
                background: `linear-gradient(to right, hsl(${hue}, 0%, ${lightness}%), hsl(${hue}, 100%, ${lightness}%))`,
              }}
            />
          </div>

          {/* Lightness Slider */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Helligkeit</label>
            <input
              type="range"
              min="5"
              max="50"
              value={lightness}
              onChange={(e) => updateFromHSL(hue, saturation, parseInt(e.target.value))}
              className="w-full h-3 rounded-full appearance-none cursor-pointer color-slider"
              style={{
                background: `linear-gradient(to right, hsl(${hue}, ${saturation}%, 5%), hsl(${hue}, ${saturation}%, 50%))`,
              }}
            />
            <p className="text-xs text-gray-400 mt-1">Tipp: Dunkle Farben scannen besser</p>
          </div>

          {/* Color Palettes */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Farbpaletten</label>
            <div className="space-y-2">
              {PALETTES.map(palette => (
                <div key={palette.name} className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 w-24 flex-shrink-0">{palette.name}</span>
                  <div className="flex gap-1.5 flex-1">
                    {palette.colors.map(c => (
                      <button
                        key={c}
                        onClick={() => {
                          setTempColor(c);
                          recalcHSL(c);
                        }}
                        className={`w-8 h-8 rounded-lg border-2 transition-transform hover:scale-110 cursor-pointer ${
                          tempColor === c ? 'border-red-500 scale-110 ring-2 ring-red-300' : 'border-gray-200'
                        }`}
                        style={{ backgroundColor: c }}
                        title={c.toUpperCase()}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 px-5 py-4 border-t border-gray-100 bg-gray-50">
          <button
            onClick={() => { setTempColor('#000000'); updateFromHSL(0, 0, 0); }}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Zurücksetzen
          </button>
          <div className="flex-1" />
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            Abbrechen
          </button>
          <button
            onClick={() => { onChange(tempColor); onClose(); }}
            className="px-6 py-2 text-sm font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
          >
            Übernehmen
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Color Picker Component ──────────────────────────────────────────────────

function ColorPicker({ color, onChange }: { color: string; onChange: (c: string) => void }) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">QR-Code Farbe</label>
      <button
        onClick={() => setShowPicker(true)}
        className="flex items-center gap-3 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:border-red-400 transition-colors cursor-pointer w-full"
      >
        <div className="w-8 h-8 rounded-lg border-2 border-gray-200 shadow-inner" style={{ backgroundColor: color }} />
        <span className="font-mono text-sm text-gray-700">{color.toUpperCase()}</span>
        <Palette className="w-4 h-4 text-gray-400 ml-auto" />
      </button>

      {showPicker && (
        <ColorPickerModal color={color} onChange={onChange} onClose={() => setShowPicker(false)} />
      )}
    </div>
  );
}

// ─── Toast Component ─────────────────────────────────────────────────────────

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className="flex items-center gap-3 bg-gray-900 text-white px-5 py-3 rounded-xl shadow-2xl">
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        <span className="text-sm font-medium">{message}</span>
        <button onClick={onClose} className="ml-2 text-gray-400 hover:text-white cursor-pointer">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ─── Download Helpers ────────────────────────────────────────────────────────

function handleDownloadPNG(
  ref: React.RefObject<HTMLDivElement | null>,
  filename: string,
  sizeCm: number,
  dpi: number
) {
  // Find the QRCodeSVG-generated SVG (skip frame wrapper SVGs by looking for the one with QR paths)
  const container = ref.current;
  if (!container) return;
  // Get all SVGs - the QRCodeSVG is the innermost one
  const svgs = container.querySelectorAll('svg');
  // Use last SVG (innermost = QR code itself), or first if only one
  const svgElement = svgs.length > 1 ? svgs[svgs.length - 1] : svgs[0];
  if (!svgElement) return;
  const printPx = Math.round(sizeCm * dpi / 2.54);
  const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement;
  clonedSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clonedSvg.setAttribute('width', String(printPx));
  clonedSvg.setAttribute('height', String(printPx));
  const svgData = new XMLSerializer().serializeToString(clonedSvg);
  const encodedData = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = printPx;
    canvas.height = printPx;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, printPx, printPx);
    ctx.drawImage(img, 0, 0, printPx, printPx);
    canvas.toBlob((blob) => {
      if (blob) {
        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(downloadUrl);
      }
    }, 'image/png');
  };
  img.src = encodedData;
}

function handleDownloadSVG(
  ref: React.RefObject<HTMLDivElement | null>,
  filename: string,
  sizeCm: number,
  dpi: number
) {
  const svgElement = ref.current?.querySelector('svg');
  if (!svgElement) return;
  const printPx = Math.round(sizeCm * dpi / 2.54);
  const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement;
  clonedSvg.setAttribute('width', `${sizeCm}cm`);
  clonedSvg.setAttribute('height', `${sizeCm}cm`);
  clonedSvg.setAttribute('viewBox', svgElement.getAttribute('viewBox') || `0 0 ${printPx} ${printPx}`);
  const svgData = new XMLSerializer().serializeToString(clonedSvg);
  const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

async function handleDownloadEPS(
  ref: React.RefObject<HTMLDivElement | null>,
  filename: string,
  sizeCm: number,
  fgColor: string,
  logoSrc?: string | null
) {
  const svgElement = ref.current?.querySelector('svg');
  if (!svgElement) return;

  const sizePt = sizeCm * 28.3465;
  const vbAttr = svgElement.getAttribute('viewBox') || '0 0 256 256';
  const viewBox = vbAttr.split(/\s+/).map(Number);
  const vbWidth = viewBox[2];
  const vbHeight = viewBox[3];
  const scale = sizePt / vbWidth;

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return { r, g, b };
  };
  const fg = hexToRgb(fgColor);

  const overlap = sizePt * 0.001;
  const toEpsPath = (x: number, y: number, w: number, h: number): string => {
    const epsX = x * scale;
    const epsY = sizePt - ((y + h) * scale);
    const epsW = w * scale + overlap;
    const epsH = h * scale + overlap;
    return `${epsX.toFixed(6)} ${epsY.toFixed(6)} m ${epsW.toFixed(6)} 0 rl 0 ${epsH.toFixed(6)} rl ${(-epsW).toFixed(6)} 0 rl cp`;
  };

  const moduleLines: string[] = [];
  const paths = svgElement.querySelectorAll('path');
  paths.forEach((path) => {
    const fill = path.getAttribute('fill') || '';
    if (fill.toUpperCase() === '#FFFFFF' || fill === 'white' || fill === 'none' || fill === 'transparent') return;
    const d = path.getAttribute('d');
    if (!d) return;
    const subpaths = d.split(/(?=M)/);
    for (const sp of subpaths) {
      const trimmed = sp.trim();
      if (!trimmed) continue;
      const commands = trimmed.match(/[MmLlHhVvZz][^MmLlHhVvZz]*/g);
      if (!commands) continue;
      let startX = 0, startY = 0, pw = 0, ph = 0;
      let valid = false;
      for (const cmd of commands) {
        const type = cmd[0];
        const numStr = cmd.slice(1).trim();
        if (type === 'z' || type === 'Z') { valid = true; continue; }
        if (!numStr) continue;
        const nums = numStr.split(/[\s,]+/).map(Number);
        if (type === 'M') { startX = nums[0]; startY = nums[1]; }
        else if (type === 'h' && pw === 0) { pw = nums[0]; }
        else if (type === 'H' && pw === 0) { pw = nums[0] - startX; }
        else if (type === 'v' && ph === 0) { ph = nums[0]; }
        else if (type === 'V' && ph === 0) { ph = nums[0] - startY; }
      }
      if (!valid || pw === 0 || ph === 0) continue;
      let rx = startX, ry = startY, rw = pw, rh = ph;
      if (rw < 0) { rx += rw; rw = -rw; }
      if (rh < 0) { ry += rh; rh = -rh; }
      if (rw >= vbWidth * 0.9 && rh >= vbHeight * 0.9) continue;
      moduleLines.push(toEpsPath(rx, ry, rw, rh));
    }
  });

  let logoEps = '';
  if (logoSrc) {
    try {
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = logoSrc;
      });
      const logoPixels = 256;
      const canvas = document.createElement('canvas');
      canvas.width = logoPixels;
      canvas.height = logoPixels;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, logoPixels, logoPixels);
      const aspect = img.width / img.height;
      let drawW = logoPixels, drawH = logoPixels;
      if (aspect > 1) drawH = logoPixels / aspect;
      else drawW = logoPixels * aspect;
      const drawX = (logoPixels - drawW) / 2;
      const drawY = (logoPixels - drawH) / 2;
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
      const imageData = ctx.getImageData(0, 0, logoPixels, logoPixels);
      const pixels = imageData.data;
      let hexData = '';
      for (let i = 0; i < pixels.length; i += 4) {
        hexData += pixels[i].toString(16).padStart(2, '0');
        hexData += pixels[i + 1].toString(16).padStart(2, '0');
        hexData += pixels[i + 2].toString(16).padStart(2, '0');
      }
      const logoSizePt = sizePt * 0.22;
      const logoX = (sizePt - logoSizePt) / 2;
      const logoY = (sizePt - logoSizePt) / 2;
      const padding = logoSizePt * 0.05;
      logoEps = `
% Logo white background
1 1 1 setrgbcolor
${(logoX - padding).toFixed(2)} ${(logoY - padding).toFixed(2)} ${(logoSizePt + padding * 2).toFixed(2)} ${(logoSizePt + padding * 2).toFixed(2)} rectfill

% Embedded logo image
gsave
${logoX.toFixed(2)} ${logoY.toFixed(2)} translate
${logoSizePt.toFixed(2)} ${logoSizePt.toFixed(2)} scale
${logoPixels} ${logoPixels} 8 [${logoPixels} 0 0 -${logoPixels} 0 ${logoPixels}]
<${hexData}>
false 3 colorimage
grestore`;
    } catch (e) {
      console.warn('Could not embed logo in EPS:', e);
    }
  }

  const epsContent = [
    '%!PS-Adobe-3.0 EPSF-3.0',
    '%%LanguageLevel: 2',
    '%%BoundingBox: 0 0 ' + Math.ceil(sizePt) + ' ' + Math.ceil(sizePt),
    '%%HiResBoundingBox: 0 0 ' + sizePt.toFixed(6) + ' ' + sizePt.toFixed(6),
    '%%Title: QR-Code ' + sizeCm + 'cm (Vector)',
    '%%Creator: qrcode-no-abo.de QR-Code Generator',
    '%%EndComments',
    '',
    '/m { moveto } def',
    '/rl { rlineto } def',
    '/cp { closepath } def',
    '/rf { rectfill } def',
    '',
    '1 1 1 setrgbcolor',
    '0 0 ' + sizePt.toFixed(6) + ' ' + sizePt.toFixed(6) + ' rf',
    '',
    fg.r.toFixed(6) + ' ' + fg.g.toFixed(6) + ' ' + fg.b.toFixed(6) + ' setrgbcolor',
    'newpath',
    ...moduleLines,
    'fill',
    '',
    ...(logoEps ? [logoEps] : []),
    '%%EOF'
  ].join('\n');

  const blob = new Blob([epsContent], { type: 'application/postscript' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function handleDownloadJPEG(ref: React.RefObject<HTMLDivElement | null>, filename: string) {
  const container = ref.current;
  if (!container) return;
  const svgs = container.querySelectorAll('svg');
  const svgElement = svgs.length > 1 ? svgs[svgs.length - 1] : svgs[0];
  if (!svgElement) return;
  const sizeMm = 25;
  const dpi = 300;
  const basePx = Math.round(sizeMm / 25.4 * dpi);
  const viewBox = svgElement.getAttribute('viewBox');
  let modules = 33;
  if (viewBox) {
    const parts = viewBox.split(/\s+/);
    if (parts.length >= 4) modules = parseInt(parts[2]) || 33;
  }
  const minPx = modules * 4;
  const printPx = Math.max(basePx, minPx);
  const margin = Math.round(printPx * 0.04);
  const totalPx = printPx + margin * 2;
  const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement;
  clonedSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clonedSvg.querySelectorAll('image').forEach(el => el.remove());
  clonedSvg.setAttribute('width', String(printPx));
  clonedSvg.setAttribute('height', String(printPx));
  const svgData = new XMLSerializer().serializeToString(clonedSvg);
  const encodedData = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = totalPx;
    canvas.height = totalPx;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, totalPx, totalPx);
    ctx.drawImage(img, margin, margin, printPx, printPx);
    canvas.toBlob((blob) => {
      if (blob) {
        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(downloadUrl);
      }
    }, 'image/jpeg', 1.0);
  };
  img.src = encodedData;
}

// ─── vCard Helpers ───────────────────────────────────────────────────────────

function generateVCard(data: BusinessCardData): string {
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    data.vorname || data.nachname ? `N:${data.nachname};${data.vorname};;;` : '',
    data.vorname || data.nachname ? `FN:${data.vorname} ${data.nachname}`.trim() : '',
    data.firma ? `ORG:${data.firma}` : '',
    data.position ? `TITLE:${data.position}` : '',
    data.email ? `EMAIL;TYPE=INTERNET:${data.email}` : '',
    data.telefon ? `TEL;TYPE=WORK,VOICE:${data.telefon}` : '',
    data.mobil ? `TEL;TYPE=CELL:${data.mobil}` : '',
    data.website ? `URL:${data.website}` : '',
    (data.adresse || data.plz || data.ort)
      ? `ADR;TYPE=WORK:;;${data.adresse};${data.ort};;${data.plz};`
      : '',
    data.linkedin ? `URL;TYPE=LinkedIn:${data.linkedin}` : '',
    data.notizen ? `NOTE:${data.notizen}` : '',
    'END:VCARD'
  ].filter(line => line !== '').join('\n');
}

function generateOutlookVCard(data: BusinessCardData): string {
  const lines = ['BEGIN:VCARD', 'VERSION:2.1'];
  if (data.vorname || data.nachname) {
    lines.push(`N:${data.nachname};${data.vorname};;;`);
    lines.push(`FN:${data.vorname} ${data.nachname}`.trim());
  }
  if (data.firma) lines.push(`ORG:${data.firma}`);
  if (data.position) lines.push(`TITLE:${data.position}`);
  if (data.email) lines.push(`EMAIL;TYPE=INTERNET:${data.email}`);
  if (data.telefon) lines.push(`TEL;TYPE=WORK;VOICE:${data.telefon}`);
  if (data.mobil) lines.push(`TEL;TYPE=CELL:${data.mobil}`);
  if (data.website) lines.push(`URL:${data.website}`);
  if (data.adresse || data.plz || data.ort) {
    lines.push(`ADR;TYPE=WORK:;;${data.adresse};${data.ort};;${data.plz};`);
  }
  if (data.linkedin) lines.push(`URL;TYPE=LinkedIn:${data.linkedin}`);
  if (data.notizen) lines.push(`NOTE:${data.notizen}`);
  lines.push('END:VCARD');
  return lines.join('\r\n');
}

function toWin1252Bytes(str: string): Uint8Array {
  const bytes: number[] = [];
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    bytes.push(code < 256 ? code : 63);
  }
  return new Uint8Array(bytes);
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  // Testphase Passwortschutz
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('qr_unlocked') === '1');
  const [pwInput, setPwInput] = useState('');

  const [activeTab, setActiveTab] = useState<TabType>('visitenkarte');
  const [showGenerator, setShowGenerator] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [showImpressum, setShowImpressum] = useState(false);
  const [showDatenschutz, setShowDatenschutz] = useState(false);

  const openTab = (tab: TabType) => {
    setActiveTab(tab);
    setShowGenerator(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // QR Code Counter
  const [qrCounter, setQrCounter] = useState(() => {
    const saved = localStorage.getItem('qr_counter');
    return saved ? parseInt(saved, 10) : 0;
  });

  const incrementCounter = () => {
    setQrCounter(prev => {
      const next = prev + 1;
      localStorage.setItem('qr_counter', String(next));
      return next;
    });
  };

  // Shared QR settings
  const [qrSizeCm, setQrSizeCm] = useState(5);
  const [qrDpi, setQrDpi] = useState(300);
  const [qrColor, setQrColor] = useState('#000000');
  const [customLogo, setCustomLogo] = useState<string | null>(null);
  const [useLogo, setUseLogo] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Frame state
  const [selectedFrame, setSelectedFrame] = useState<string>('none');
  const [frameText, setFrameText] = useState('SCAN ME');

  // Link tab state
  const [linkUrl, setLinkUrl] = useState('');

  // Visitenkarte tab state
  const [formData, setFormData] = useState<BusinessCardData>({ ...EMPTY_FORM });

  // WiFi tab state
  const [wifiSsid, setWifiSsid] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [wifiEncryption, setWifiEncryption] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');

  // Email tab state
  const [emailAddress, setEmailAddress] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  // SMS tab state
  const [smsNumber, setSmsNumber] = useState('');
  const [smsMessage, setSmsMessage] = useState('');

  // Telefon tab state
  const [telNumber, setTelNumber] = useState('');

  // WhatsApp tab state
  const [waNumber, setWaNumber] = useState('');
  const [waMessage, setWaMessage] = useState('');

  // Social Media tab states
  const [instagramUser, setInstagramUser] = useState('');
  const [tiktokUser, setTiktokUser] = useState('');
  const [facebookUser, setFacebookUser] = useState('');
  const [youtubeChannel, setYoutubeChannel] = useState('');
  const [linkedinUser, setLinkedinUser] = useState('');
  const [twitterUser, setTwitterUser] = useState('');

  // Google Review tab state
  const [googleInput, setGoogleInput] = useState('');
  const [googlePlaceId, setGooglePlaceId] = useState('');

  const extractPlaceId = (input: string): string => {
    // Direct Place ID (starts with ChIJ or similar)
    if (/^ChIJ/.test(input.trim())) {
      return input.trim();
    }
    // Try to find place_id in URL parameters
    const placeIdMatch = input.match(/place_id[=:]([A-Za-z0-9_-]+)/);
    if (placeIdMatch) return placeIdMatch[1];
    // Try data= parameter format from Maps URLs
    const dataMatch = input.match(/!1s(0x[0-9a-f]+:[0-9a-fx]+)/i);
    if (dataMatch) return dataMatch[1];
    // CID format
    const cidMatch = input.match(/cid=(\d+)/);
    if (cidMatch) return cidMatch[1];
    return '';
  };

  const handleGoogleInput = (value: string) => {
    setGoogleInput(value);
    const extracted = extractPlaceId(value);
    setGooglePlaceId(extracted);
  };

  // Computed
  const printPx = Math.round(qrSizeCm * qrDpi / 2.54);
  const previewPx = 256;
  const vCardData = generateVCard(formData);
  const hasData = Object.values(formData).some(v => v !== '');

  // Compute QR value based on active tab
  const getQrValue = (): string => {
    switch (activeTab) {
      case 'link':
        return linkUrl || '';
      case 'visitenkarte':
        return hasData ? vCardData : '';
      case 'wifi':
        return wifiSsid ? `WIFI:T:${wifiEncryption};S:${wifiSsid};P:${wifiPassword};;` : '';
      case 'email': {
        if (!emailAddress) return '';
        let mailto = `mailto:${emailAddress}`;
        const params: string[] = [];
        if (emailSubject) params.push(`subject=${encodeURIComponent(emailSubject)}`);
        if (emailBody) params.push(`body=${encodeURIComponent(emailBody)}`);
        if (params.length) mailto += '?' + params.join('&');
        return mailto;
      }
      case 'sms':
        return smsNumber ? `smsto:${smsNumber}:${smsMessage}` : '';
      case 'telefon':
        return telNumber ? `tel:${telNumber}` : '';
      case 'whatsapp': {
        if (!waNumber) return '';
        const num = waNumber.replace(/[^0-9]/g, '');
        return waMessage
          ? `https://wa.me/${num}?text=${encodeURIComponent(waMessage)}`
          : `https://wa.me/${num}`;
      }
      case 'instagram':
        return instagramUser ? `https://instagram.com/${instagramUser.replace('@', '')}` : '';
      case 'tiktok':
        return tiktokUser ? `https://tiktok.com/@${tiktokUser.replace('@', '')}` : '';
      case 'facebook':
        return facebookUser ? `https://facebook.com/${facebookUser.replace('@', '')}` : '';
      case 'youtube':
        return youtubeChannel ? `https://youtube.com/@${youtubeChannel.replace('@', '')}` : '';
      case 'linkedin':
        return linkedinUser ? `https://linkedin.com/in/${linkedinUser.replace('@', '')}` : '';
      case 'twitter':
        return twitterUser ? `https://x.com/${twitterUser.replace('@', '')}` : '';
      case 'google-review': {
        if (googlePlaceId) {
          return `https://search.google.com/local/writereview?placeid=${googlePlaceId}`;
        }
        // If no Place ID extracted, use the raw input as URL (user might paste review link directly)
        if (googleInput.startsWith('http')) {
          return googleInput;
        }
        return '';
      }
      default:
        return '';
    }
  };

  const qrValue = getQrValue();
  const hasQrValue = qrValue.length > 0;
  const logoSrc = useLogo ? customLogo : null;

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleInputChange = (field: keyof BusinessCardData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setCustomLogo(dataUrl);
      setUseLogo(true);
    };
    reader.readAsDataURL(file);
  };

  const handleExportVCF = () => {
    const vcardText = generateOutlookVCard(formData);
    const blob = new Blob([toWin1252Bytes(vcardText)], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const nachname = formData.nachname || 'kontakt';
    const vorname = formData.vorname || '';
    a.download = vorname ? `${nachname}_${vorname}.vcf` : `${nachname}.vcf`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('VCF-Datei heruntergeladen');
  };

  const handleCopyVCard = () => {
    navigator.clipboard.writeText(vCardData);
    showToast('vCard-Daten in Zwischenablage kopiert');
  };

  // JSON Export
  const handleExportJSON = () => {
    const exportData = {
      version: 1,
      type: 'qrcode-no-abo-visitenkarte',
      data: formData,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const name = formData.nachname || formData.vorname || 'visitenkarte';
    a.download = `${name.toLowerCase().replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('JSON-Daten exportiert');
  };

  // JSON Import
  const jsonInputRef = useRef<HTMLInputElement>(null);
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string);
        const imported = parsed.data || parsed;
        setFormData({
          vorname: imported.vorname || '',
          nachname: imported.nachname || '',
          position: imported.position || '',
          firma: imported.firma || '',
          email: imported.email || '',
          telefon: imported.telefon || '',
          mobil: imported.mobil || '',
          website: imported.website || '',
          adresse: imported.adresse || '',
          plz: imported.plz || '',
          ort: imported.ort || '',
          linkedin: imported.linkedin || '',
          notizen: imported.notizen || ''
        });
        showToast('Visitenkarten-Daten importiert');
      } catch {
        showToast('Fehler: Ungültige JSON-Datei');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // ─── Passwortschutz (Testphase) ─────────────────────────────────────────────

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-700 to-rose-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm text-center">
          <div className="text-4xl mb-4">🔒</div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Testphase</h1>
          <p className="text-sm text-gray-500 mb-6">Diese Seite befindet sich noch in der Entwicklung.</p>
          <input
            type="password"
            value={pwInput}
            onChange={(e) => setPwInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && pwInput === '54321!') {
                sessionStorage.setItem('qr_unlocked', '1');
                setUnlocked(true);
              }
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none mb-4"
            placeholder="Passwort"
            autoFocus
          />
          <button
            onClick={() => {
              if (pwInput === '54321!') {
                sessionStorage.setItem('qr_unlocked', '1');
                setUnlocked(true);
              }
            }}
            className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
          >
            Zugang
          </button>
        </div>
      </div>
    );
  }

  // ─── Download Buttons Component ──────────────────────────────────────────────

  function DownloadButtons({ prefix }: { prefix: string }) {
    if (selectedFrame === 'none') {
      return (
        <div className="space-y-2">
          <button
            onClick={() => { incrementCounter(); handleDownloadPNG(qrRef, `${prefix}-${qrSizeCm}cm-${qrDpi}dpi.png`, qrSizeCm, qrDpi); }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer font-medium"
          >
            <Download className="w-4 h-4" />
            PNG herunterladen ({printPx}px, {qrDpi} DPI)
          </button>
          <button
            onClick={() => { incrementCounter(); handleDownloadSVG(qrRef, `${prefix}.svg`, qrSizeCm, qrDpi); }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors cursor-pointer font-medium"
          >
            <Download className="w-4 h-4" />
            SVG herunterladen (Vektor)
          </button>
          <button
            onClick={() => { incrementCounter(); handleDownloadEPS(qrRef, `${prefix}.eps`, qrSizeCm, qrColor, logoSrc); }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors cursor-pointer font-medium"
          >
            <Download className="w-4 h-4" />
            EPS herunterladen (Druck)
          </button>
          <button
            onClick={() => { incrementCounter(); handleDownloadJPEG(qrRef, `${prefix}-25mm-300dpi.jpg`); }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors cursor-pointer font-medium"
          >
            <Download className="w-4 h-4" />
            JPEG herunterladen (25mm, 300 DPI)
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <button
          onClick={() => { incrementCounter(); handleDownloadFramePNG(qrRef, `${prefix}-${selectedFrame}.png`, Math.round(qrSizeCm * qrDpi / 2.54) / previewPx); }}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer font-medium"
        >
          <Download className="w-4 h-4" />
          PNG herunterladen (mit Rahmen)
        </button>
        <button
          onClick={() => { incrementCounter(); handleDownloadFrameSVG(qrRef, `${prefix}-${selectedFrame}.svg`); }}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors cursor-pointer font-medium"
        >
          <Download className="w-4 h-4" />
          SVG herunterladen (mit Rahmen)
        </button>
        <button
          onClick={() => { incrementCounter(); handleDownloadEPS(qrRef, `${prefix}-${selectedFrame}.eps`, qrSizeCm, qrColor, logoSrc); }}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors cursor-pointer font-medium"
        >
          <Download className="w-4 h-4" />
          EPS herunterladen (Druck)
        </button>
        <button
          onClick={() => { incrementCounter(); handleDownloadJPEG(qrRef, `${prefix}-${selectedFrame}-25mm-300dpi.jpg`); }}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors cursor-pointer font-medium"
        >
          <Download className="w-4 h-4" />
          JPEG herunterladen (25mm, 300 DPI)
        </button>
      </div>
    );
  }

  // ─── QR Preview Panel (shared across all tabs) ────────────────────────────

  function QRPreviewPanel({ prefix, extra }: { prefix: string; extra?: React.ReactNode }) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <QrCode className="w-5 h-5 text-red-600" />
          QR-Code Vorschau
        </h2>

        {!hasQrValue ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <QrCode className="w-16 h-16 mb-4 opacity-30" />
            <p className="text-center text-sm">Daten eingeben, um QR-Code zu generieren</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-center">
              <QRWithFrame
                qrRef={qrRef}
                qrValue={qrValue}
                qrSize={previewPx}
                qrColor={qrColor}
                qrLevel={logoSrc ? 'Q' : 'M'}
                imageSettings={
                  logoSrc
                    ? {
                        src: logoSrc,
                        x: undefined,
                        y: undefined,
                        height: previewPx * 0.22,
                        width: previewPx * 0.22,
                        excavate: true,
                      }
                    : undefined
                }
                frameName={selectedFrame}
                frameText={frameText}
              />
            </div>

            <FrameSelector
              selectedFrame={selectedFrame}
              setSelectedFrame={setSelectedFrame}
              frameText={frameText}
              setFrameText={setFrameText}
            />

            {/* Size & DPI */}
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Druckgröße: {qrSizeCm} cm
                </label>
                <input
                  type="range" min="2" max="15" step="0.5"
                  value={qrSizeCm}
                  onChange={(e) => setQrSizeCm(parseFloat(e.target.value))}
                  className="w-full accent-red-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>2 cm</span><span>15 cm</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Auflösung (DPI)</label>
                <div className="flex gap-2">
                  {[300, 600].map((d) => (
                    <button
                      key={d}
                      onClick={() => setQrDpi(d)}
                      className={`flex-1 py-1.5 px-3 rounded-lg border text-sm transition-colors cursor-pointer ${
                        qrDpi === d
                          ? 'border-red-500 bg-red-50 text-red-700 font-medium'
                          : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {d} DPI
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-400">
                Ausgabe: {printPx} x {printPx} px ({qrSizeCm} cm bei {qrDpi} DPI)
              </p>
            </div>

            {/* Logo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Logo in der Mitte</label>
              <div className="space-y-2">
                <button
                  onClick={() => logoInputRef.current?.click()}
                  className={`w-full py-2 px-3 rounded-lg border text-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                    useLogo && customLogo
                      ? 'border-red-500 bg-red-50 text-red-700 font-medium'
                      : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  Eigenes Logo hochladen
                </button>
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                {customLogo && useLogo && (
                  <div className="flex items-center gap-2 p-2.5 bg-red-50 rounded-lg border border-red-100">
                    <img src={customLogo} alt="Logo" className="h-8 w-8 object-contain rounded" />
                    <span className="text-xs text-red-700 flex-1 font-medium">Logo aktiv</span>
                    <button
                      onClick={() => { setCustomLogo(null); setUseLogo(false); }}
                      className="p-1 text-red-500 hover:bg-red-100 rounded cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                <button
                  onClick={() => { setUseLogo(false); setCustomLogo(null); }}
                  className={`w-full py-2 px-3 rounded-lg border text-sm transition-colors cursor-pointer ${
                    !useLogo
                      ? 'border-red-500 bg-red-50 text-red-700 font-medium'
                      : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Kein Logo
                </button>
              </div>
            </div>

            <ColorPicker color={qrColor} onChange={setQrColor} />

            <DownloadButtons prefix={prefix} />

            {extra}

            <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-xs text-gray-500 font-medium mb-1">QR-Code Inhalt:</p>
              <p className="text-xs text-gray-700 break-all font-mono">{qrValue}</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ─── Input field helper ────────────────────────────────────────────────────

  const inputClass = "w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-shadow";

  // ─── Render Tab Forms ──────────────────────────────────────────────────────

  function renderTabForm() {
    switch (activeTab) {
      case 'link':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Link className="w-5 h-5 text-red-600" />
              Link eingeben
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL / Link</label>
              <input
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className={inputClass}
                placeholder="https://www.beispiel.de"
              />
            </div>
          </div>
        );

      case 'wifi':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Wifi className="w-5 h-5 text-red-600" />
              WiFi-Netzwerk
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Netzwerkname (SSID)</label>
              <input
                type="text"
                value={wifiSsid}
                onChange={(e) => setWifiSsid(e.target.value)}
                className={inputClass}
                placeholder="MeinWiFi"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Passwort</label>
              <input
                type="text"
                value={wifiPassword}
                onChange={(e) => setWifiPassword(e.target.value)}
                className={inputClass}
                placeholder="Passwort eingeben"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Verschlüsselung</label>
              <div className="flex gap-2">
                {([['WPA', 'WPA/WPA2'], ['WEP', 'WEP'], ['nopass', 'Keine']] as const).map(([val, label]) => (
                  <button
                    key={val}
                    onClick={() => setWifiEncryption(val)}
                    className={`flex-1 py-2 px-3 rounded-lg border text-sm transition-colors cursor-pointer ${
                      wifiEncryption === val
                        ? 'border-red-500 bg-red-50 text-red-700 font-medium'
                        : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'email':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Mail className="w-5 h-5 text-red-600" />
              E-Mail
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-Mail-Adresse</label>
              <input
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                className={inputClass}
                placeholder="beispiel@email.de"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Betreff (optional)</label>
              <input
                type="text"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                className={inputClass}
                placeholder="Betreff der E-Mail"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nachricht (optional)</label>
              <textarea
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                rows={3}
                className={`${inputClass} resize-none`}
                placeholder="Nachricht eingeben..."
              />
            </div>
          </div>
        );

      case 'sms':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-red-600" />
              SMS
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefonnummer</label>
              <input
                type="tel"
                value={smsNumber}
                onChange={(e) => setSmsNumber(e.target.value)}
                className={inputClass}
                placeholder="+49 170 1234567"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nachricht (optional)</label>
              <textarea
                value={smsMessage}
                onChange={(e) => setSmsMessage(e.target.value)}
                rows={3}
                className={`${inputClass} resize-none`}
                placeholder="SMS-Nachricht eingeben..."
              />
            </div>
          </div>
        );

      case 'telefon':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Phone className="w-5 h-5 text-red-600" />
              Telefon
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefonnummer</label>
              <input
                type="tel"
                value={telNumber}
                onChange={(e) => setTelNumber(e.target.value)}
                className={inputClass}
                placeholder="+49 211 1234567"
              />
            </div>
          </div>
        );

      case 'whatsapp':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-red-600" />
              WhatsApp
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefonnummer (mit Landesvorwahl)</label>
              <input
                type="tel"
                value={waNumber}
                onChange={(e) => setWaNumber(e.target.value)}
                className={inputClass}
                placeholder="+49 170 1234567"
              />
              <p className="text-xs text-gray-400 mt-1">Z.B. +49 für Deutschland</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nachricht (optional)</label>
              <textarea
                value={waMessage}
                onChange={(e) => setWaMessage(e.target.value)}
                rows={3}
                className={`${inputClass} resize-none`}
                placeholder="WhatsApp-Nachricht eingeben..."
              />
            </div>
          </div>
        );

      case 'instagram':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
            <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: 'linear-gradient(45deg, #FFDC80, #F77737, #C13584)' }}>
              <InstagramIcon large />
              <div className="text-white">
                <h3 className="font-bold text-lg">Instagram</h3>
                <p className="text-sm text-white/80">QR-Code zu deinem Instagram-Profil</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Benutzername</label>
              <input type="text" value={instagramUser} onChange={e => setInstagramUser(e.target.value)}
                className={inputClass}
                placeholder="@maxmustermann" />
            </div>
            {instagramUser && (
              <p className="text-xs text-gray-500">
                Profil-URL: <span className="font-mono text-gray-700">https://instagram.com/{instagramUser.replace('@', '')}</span>
              </p>
            )}
          </div>
        );

      case 'tiktok':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-black">
              <TikTokIcon large />
              <div className="text-white">
                <h3 className="font-bold text-lg">TikTok</h3>
                <p className="text-sm text-white/80">QR-Code zu deinem TikTok-Profil</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Benutzername</label>
              <input type="text" value={tiktokUser} onChange={e => setTiktokUser(e.target.value)}
                className={inputClass}
                placeholder="@maxmustermann" />
            </div>
            {tiktokUser && (
              <p className="text-xs text-gray-500">
                Profil-URL: <span className="font-mono text-gray-700">https://tiktok.com/@{tiktokUser.replace('@', '')}</span>
              </p>
            )}
          </div>
        );

      case 'facebook':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
            <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: '#1877F2' }}>
              <FacebookIcon large />
              <div className="text-white">
                <h3 className="font-bold text-lg">Facebook</h3>
                <p className="text-sm text-white/80">QR-Code zu deinem Facebook-Profil</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Benutzername / Seiten-ID</label>
              <input type="text" value={facebookUser} onChange={e => setFacebookUser(e.target.value)}
                className={inputClass}
                placeholder="maxmustermann" />
            </div>
            {facebookUser && (
              <p className="text-xs text-gray-500">
                Profil-URL: <span className="font-mono text-gray-700">https://facebook.com/{facebookUser.replace('@', '')}</span>
              </p>
            )}
          </div>
        );

      case 'youtube':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
            <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: '#FF0000' }}>
              <YouTubeIcon large />
              <div className="text-white">
                <h3 className="font-bold text-lg">YouTube</h3>
                <p className="text-sm text-white/80">QR-Code zu deinem YouTube-Kanal</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kanal-Name</label>
              <input type="text" value={youtubeChannel} onChange={e => setYoutubeChannel(e.target.value)}
                className={inputClass}
                placeholder="@maxmustermann" />
            </div>
            {youtubeChannel && (
              <p className="text-xs text-gray-500">
                Kanal-URL: <span className="font-mono text-gray-700">https://youtube.com/@{youtubeChannel.replace('@', '')}</span>
              </p>
            )}
          </div>
        );

      case 'linkedin':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
            <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: '#0A66C2' }}>
              <LinkedInIcon large />
              <div className="text-white">
                <h3 className="font-bold text-lg">LinkedIn</h3>
                <p className="text-sm text-white/80">QR-Code zu deinem LinkedIn-Profil</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Profil-Name (aus der URL)</label>
              <input type="text" value={linkedinUser} onChange={e => setLinkedinUser(e.target.value)}
                className={inputClass}
                placeholder="max-mustermann" />
            </div>
            {linkedinUser && (
              <p className="text-xs text-gray-500">
                Profil-URL: <span className="font-mono text-gray-700">https://linkedin.com/in/{linkedinUser.replace('@', '')}</span>
              </p>
            )}
          </div>
        );

      case 'twitter':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-black">
              <XIcon large />
              <div className="text-white">
                <h3 className="font-bold text-lg">X (Twitter)</h3>
                <p className="text-sm text-white/80">QR-Code zu deinem X-Profil</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Benutzername</label>
              <input type="text" value={twitterUser} onChange={e => setTwitterUser(e.target.value)}
                className={inputClass}
                placeholder="@maxmustermann" />
            </div>
            {twitterUser && (
              <p className="text-xs text-gray-500">
                Profil-URL: <span className="font-mono text-gray-700">https://x.com/{twitterUser.replace('@', '')}</span>
              </p>
            )}
          </div>
        );

      case 'google-review':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500">
              <GoogleIcon large />
              <div className="text-white">
                <h3 className="font-bold text-lg">Google Bewertung</h3>
                <p className="text-sm text-white/80">QR-Code für Kundenbewertungen auf Google</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Google Maps Link oder Place ID
              </label>
              <input
                type="text"
                value={googleInput}
                onChange={(e) => handleGoogleInput(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                placeholder="https://www.google.com/maps/place/..."
              />
            </div>

            {googlePlaceId && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800 font-medium">Place ID erkannt!</p>
                <p className="text-xs text-green-600 font-mono mt-1">{googlePlaceId}</p>
                <p className="text-xs text-green-700 mt-2">
                  Bewertungslink: <span className="font-mono">https://search.google.com/local/writereview?placeid={googlePlaceId}</span>
                </p>
              </div>
            )}

            {googleInput && !googlePlaceId && !googleInput.startsWith('http') && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">Place ID konnte nicht automatisch erkannt werden. Bitte fügen Sie Ihren Google Maps Link ein.</p>
              </div>
            )}

            {googleInput && !googlePlaceId && googleInput.startsWith('http') && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">Link erkannt - QR-Code wird mit diesem Link erstellt.</p>
              </div>
            )}

            {/* Instructions */}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
              <h4 className="font-semibold text-gray-900 text-sm mb-3">So finden Sie Ihren Google Maps Link:</h4>
              <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                <li>Öffnen Sie <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" className="text-red-600 underline">Google Maps</a></li>
                <li>Suchen Sie Ihr Geschäft / Restaurant / Unternehmen</li>
                <li>Klicken Sie auf <strong>"Teilen"</strong></li>
                <li>Kopieren Sie den <strong>Link</strong> und fügen Sie ihn oben ein</li>
              </ol>
              <div className="mt-3 p-3 bg-white border border-gray-200 rounded-lg">
                <p className="text-xs font-semibold text-gray-700 mb-1">Alternative: Place ID direkt eingeben</p>
                <p className="text-xs text-gray-500">
                  Ihre Place ID finden Sie auf: <a href="https://developers.google.com/maps/documentation/places/web-service/place-id-finder" target="_blank" rel="noopener noreferrer" className="text-red-600 underline">Google Place ID Finder</a>
                </p>
              </div>
            </div>
          </div>
        );

      case 'visitenkarte':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <User className="w-5 h-5 text-red-600" />
                Visitenkarten-Daten
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => jsonInputRef.current?.click()}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition-colors cursor-pointer font-medium text-xs"
                >
                  <FileUp className="w-3.5 h-3.5" />
                  JSON laden
                </button>
                <button
                  onClick={handleExportJSON}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition-colors cursor-pointer font-medium text-xs"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  JSON speichern
                </button>
                <input
                  ref={jsonInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleImportJSON}
                  className="hidden"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vorname</label>
                  <input type="text" value={formData.vorname}
                    onChange={(e) => handleInputChange('vorname', e.target.value)}
                    className={inputClass}
                    placeholder="Max" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nachname</label>
                  <input type="text" value={formData.nachname}
                    onChange={(e) => handleInputChange('nachname', e.target.value)}
                    className={inputClass}
                    placeholder="Mustermann" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <Building className="w-4 h-4" /> Firma
                </label>
                <input type="text" value={formData.firma}
                  onChange={(e) => handleInputChange('firma', e.target.value)}
                  className={inputClass}
                  placeholder="Muster GmbH" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <input type="text" value={formData.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  className={inputClass}
                  placeholder="Geschäftsführer" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <Mail className="w-4 h-4" /> E-Mail
                </label>
                <input type="email" value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={inputClass}
                  placeholder="max@muster.de" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <Phone className="w-4 h-4" /> Telefon
                  </label>
                  <input type="tel" value={formData.telefon}
                    onChange={(e) => handleInputChange('telefon', e.target.value)}
                    className={inputClass}
                    placeholder="+49 123 456789" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <Smartphone className="w-4 h-4" /> Mobil
                  </label>
                  <input type="tel" value={formData.mobil}
                    onChange={(e) => handleInputChange('mobil', e.target.value)}
                    className={inputClass}
                    placeholder="+49 170 1234567" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <Globe className="w-4 h-4" /> Website
                </label>
                <input type="url" value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className={inputClass}
                  placeholder="https://www.muster.de" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> Adresse
                </label>
                <input type="text" value={formData.adresse}
                  onChange={(e) => handleInputChange('adresse', e.target.value)}
                  className={inputClass}
                  placeholder="Musterstraße 123" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PLZ</label>
                  <input type="text" value={formData.plz}
                    onChange={(e) => handleInputChange('plz', e.target.value)}
                    className={inputClass}
                    placeholder="12345" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ort</label>
                  <input type="text" value={formData.ort}
                    onChange={(e) => handleInputChange('ort', e.target.value)}
                    className={inputClass}
                    placeholder="Musterstadt" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </label>
                <input type="url" value={formData.linkedin}
                  onChange={(e) => handleInputChange('linkedin', e.target.value)}
                  className={inputClass}
                  placeholder="https://linkedin.com/in/..." />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <FileText className="w-4 h-4" /> Notizen
                </label>
                <textarea value={formData.notizen}
                  onChange={(e) => handleInputChange('notizen', e.target.value)}
                  rows={3}
                  className={`${inputClass} resize-none`}
                  placeholder="Zusätzliche Informationen..." />
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setFormData({ ...EMPTY_FORM })}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm cursor-pointer"
                >
                  Felder leeren
                </button>
              </div>
            </div>
          </div>
        );
    }
  }

  // Get prefix for download filenames
  const getPrefix = (): string => {
    switch (activeTab) {
      case 'link': return 'link-qr-code';
      case 'google-review': return 'google-bewertung-qr';
      case 'visitenkarte': return `visitenkarte-qr-${formData.nachname || 'code'}`;
      case 'wifi': return `wifi-qr-${wifiSsid || 'code'}`;
      case 'email': return 'email-qr-code';
      case 'sms': return 'sms-qr-code';
      case 'telefon': return 'telefon-qr-code';
      case 'whatsapp': return 'whatsapp-qr-code';
      case 'instagram': return `instagram-qr-${instagramUser || 'code'}`;
      case 'tiktok': return `tiktok-qr-${tiktokUser || 'code'}`;
      case 'facebook': return `facebook-qr-${facebookUser || 'code'}`;
      case 'youtube': return `youtube-qr-${youtubeChannel || 'code'}`;
      case 'linkedin': return `linkedin-qr-${linkedinUser || 'code'}`;
      case 'twitter': return `x-qr-${twitterUser || 'code'}`;
    }
  };

  // Extra content for visitenkarte preview panel
  const vcardExtra = activeTab === 'visitenkarte' && hasQrValue ? (
    <>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => { incrementCounter(); handleExportVCF(); }}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer font-medium text-sm"
        >
          <Download className="w-4 h-4" />
          VCF exportieren
        </button>
        <button
          onClick={handleCopyVCard}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer font-medium text-sm"
        >
          <Copy className="w-4 h-4" />
          vCard kopieren
        </button>
      </div>
      <details className="group">
        <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700 font-medium">
          vCard-Daten anzeigen
        </summary>
        <pre className="mt-2 p-3 bg-gray-50 rounded-lg text-xs text-gray-600 overflow-x-auto border border-gray-100 whitespace-pre-wrap">
          {vCardData}
        </pre>
      </details>
    </>
  ) : undefined;

  // ─── Feature Cards Data ──────────────────────────────────────────────────────

  const FEATURE_CARDS: { id: TabType; title: string; icon: React.ReactNode; description: string; qrValue: string }[] = [
    { id: 'visitenkarte', title: 'Visitenkarte (vCard)', icon: <User className="w-5 h-5 text-red-600" />, description: 'Erstelle QR-Codes mit deinen Kontaktdaten. Beim Scannen werden Name, Telefon, E-Mail und Adresse direkt ins Adressbuch importiert.', qrValue: 'BEGIN:VCARD' },
    { id: 'link', title: 'Link / URL', icon: <Link className="w-5 h-5 text-red-600" />, description: 'Verlinke auf jede beliebige Website. Ideal für Flyer, Plakate, Visitenkarten und Produktverpackungen.', qrValue: 'https://qrcode-no-abo.de' },
    { id: 'google-review', title: 'Google Bewertung', icon: <GoogleIcon />, description: 'Führe Kunden direkt zu deiner Google-Bewertungsseite. Perfekt für Restaurants, Geschäfte und Dienstleister.', qrValue: 'https://google.com/maps' },
    { id: 'wifi', title: 'WiFi', icon: <Wifi className="w-5 h-5 text-red-600" />, description: 'Gäste verbinden sich per Scan direkt mit deinem WLAN. Kein Passwort abtippen mehr nötig.', qrValue: 'WIFI:T:WPA;S:MeinWLAN;;' },
    { id: 'email', title: 'E-Mail', icon: <Mail className="w-5 h-5 text-red-600" />, description: 'Erstelle QR-Codes die eine vorausgefüllte E-Mail öffnen. Ideal für Kontaktanfragen und Support.', qrValue: 'mailto:info@example.de' },
    { id: 'sms', title: 'SMS', icon: <MessageSquare className="w-5 h-5 text-red-600" />, description: 'QR-Code für vorausgefüllte SMS-Nachrichten. Perfekt für Bestellungen und Rückruf-Bitten.', qrValue: 'smsto:+49123:Hallo' },
    { id: 'telefon', title: 'Telefon', icon: <Phone className="w-5 h-5 text-red-600" />, description: 'Ein Scan genügt und dein Telefon startet den Anruf. Ideal für Notfall-Kontakte und Service-Nummern.', qrValue: 'tel:+49123456' },
    { id: 'whatsapp', title: 'WhatsApp', icon: <MessageCircle className="w-5 h-5 text-green-600" />, description: 'Direkter Link zu deinem WhatsApp-Chat mit vorausgefüllter Nachricht. Perfekt für Kundenservice.', qrValue: 'https://wa.me/49123' },
    { id: 'instagram', title: 'Instagram', icon: <InstagramIcon />, description: 'QR-Code direkt zu deinem Instagram-Profil. Perfekt für Social Media Marketing.', qrValue: 'https://instagram.com' },
    { id: 'tiktok', title: 'TikTok', icon: <TikTokIcon />, description: 'Verlinke auf dein TikTok-Profil per QR-Code. Ideal für Creator und Marken.', qrValue: 'https://tiktok.com' },
    { id: 'facebook', title: 'Facebook', icon: <FacebookIcon />, description: 'QR-Code zu deiner Facebook-Seite oder deinem Profil.', qrValue: 'https://facebook.com' },
    { id: 'youtube', title: 'YouTube', icon: <YouTubeIcon />, description: 'Verlinke direkt auf deinen YouTube-Kanal per QR-Code.', qrValue: 'https://youtube.com' },
    { id: 'linkedin', title: 'LinkedIn', icon: <LinkedInIcon />, description: 'Professioneller QR-Code zu deinem LinkedIn-Profil. Ideal für Networking und Visitenkarten.', qrValue: 'https://linkedin.com' },
    { id: 'twitter', title: 'X (Twitter)', icon: <XIcon />, description: 'QR-Code zu deinem X/Twitter-Profil.', qrValue: 'https://x.com' },
  ];

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Structured Data - hardcoded JSON, no user input */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: STRUCTURED_DATA_JSON }}
      />

      {/* Toast */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* Header */}
      <header className="bg-gradient-to-r from-red-700 via-red-600 to-rose-600 text-white">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-white/15 rounded-xl backdrop-blur-sm">
                <QrCode className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                QR-Code Generator
              </h1>
            </div>
            <p className="text-lg sm:text-xl font-semibold text-white/90 mb-2">
              Kostenlos. Open Source. Ohne Abo.
            </p>
            {!showGenerator && (
              <p className="text-sm sm:text-base text-white/75 max-w-xl mb-3">
                Diese Website ist ein Open-Source-Projekt und verdient keinerlei Geld.
                Keine Cookies. Keine Tracker. Alle Daten bleiben in deinem Browser.
              </p>
            )}
            {showGenerator && (
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-2">
                <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium">
                  <Zap className="w-4 h-4" /> Kostenlos
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium">
                  <Lock className="w-4 h-4" /> Ohne Abo
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium">
                  <Shield className="w-4 h-4" /> Ohne Registrierung
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {showGenerator ? (
        <>
          {/* Back button bar */}
          <div className="bg-white border-b border-gray-200">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-2">
              <button
                onClick={() => setShowGenerator(false)}
                className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-red-600 transition-colors cursor-pointer font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Zurück zur Übersicht
              </button>
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 max-w-screen-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {renderTabForm()}
              <QRPreviewPanel prefix={getPrefix()} extra={vcardExtra} />
            </div>

            {/* Other QR Types - Mini Cards */}
            <div className="mt-10">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Weitere QR-Code Typen</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
                {FEATURE_CARDS.filter(card => card.id !== activeTab).map(card => (
                  <button
                    key={card.id}
                    onClick={() => { setActiveTab(card.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="bg-white rounded-xl border border-gray-200 p-3 hover:shadow-md hover:border-red-300 transition-all cursor-pointer text-center group"
                  >
                    <div className="flex justify-center mb-2">
                      <div className="bg-gray-50 rounded-lg p-1.5 group-hover:bg-red-50 transition-colors">
                        <QRCodeSVG value="https://qrcode-no-abo.de" size={40} fgColor="#dc2626" level="L" />
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-1.5 mb-0.5">
                      {card.icon}
                      <span className="font-semibold text-gray-900 text-xs">{card.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </main>
        </>
      ) : (
        <>
          {/* Landing Page: Feature Cards */}
          <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-10 sm:py-14 w-full">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-2">
              Was kannst du hier erstellen?
            </h2>
            <p className="text-gray-500 text-center mb-8 text-sm sm:text-base">
              Wähle einen QR-Code Typ und leg direkt los - kostenlos und ohne Anmeldung.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {FEATURE_CARDS.map(card => (
                <button
                  key={card.id}
                  onClick={() => openTab(card.id)}
                  className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-red-300 transition-all cursor-pointer text-left group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 bg-gray-50 rounded-lg p-2 group-hover:bg-red-50 transition-colors">
                      <QRCodeSVG value="https://qrcode-no-abo.de" size={56} fgColor="#dc2626" level="L" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {card.icon}
                        <h3 className="font-bold text-gray-900">{card.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600">{card.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Feature Highlights */}
          <section className="bg-white border-t border-b border-gray-200 py-6">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-700">
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-600" /> 14 QR-Code Typen</span>
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-600" /> 8 Rahmen-Templates</span>
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-600" /> PNG, SVG, EPS, JPEG</span>
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-600" /> 100% im Browser</span>
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-600" /> Kein Tracking</span>
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-600" /> Open Source</span>
              </div>
            </div>
          </section>

          {/* Why Section */}
          <section className="bg-white py-12 sm:py-16">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
                Warum qrcode-no-abo.de?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: <Zap className="w-6 h-6" />,
                    title: '100% Kostenlos',
                    desc: 'Keine versteckten Kosten. Kein Abo. Kein Haken.'
                  },
                  {
                    icon: <Shield className="w-6 h-6" />,
                    title: 'Datenschutz',
                    desc: 'Alle Daten werden nur in deinem Browser verarbeitet. Nichts wird an einen Server gesendet.'
                  },
                  {
                    icon: <Download className="w-6 h-6" />,
                    title: 'Profi-Formate',
                    desc: 'Export als PNG, SVG, EPS und JPEG in druckfähiger Qualität.'
                  },
                  {
                    icon: <Smartphone className="w-6 h-6" />,
                    title: 'Mobile-optimiert',
                    desc: 'Funktioniert auf jedem Gerät - vom Handy bis zum Desktop.'
                  }
                ].map((item, i) => (
                  <div key={i} className="text-center p-6 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 text-red-600 rounded-xl mb-4">
                      {item.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* FAQ Section */}
      <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Häufig gestellte Fragen</h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {FAQ_DATA.map((faq, i) => (
            <details key={i} className="group bg-white rounded-xl border border-gray-200 shadow-sm">
              <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-gray-900 text-sm sm:text-base">
                {faq.question}
                <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-2" />
              </summary>
              <p className="px-5 pb-5 text-gray-600 text-sm">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 mt-auto">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm font-medium text-gray-300">qrcode-no-abo.de</p>
              <p className="text-xs mt-1">Kostenloser QR-Code Generator - Alle Daten bleiben in deinem Browser.</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <button onClick={() => setShowImpressum(true)} className="hover:text-white transition-colors cursor-pointer">Impressum</button>
              <span className="text-gray-600">|</span>
              <button onClick={() => setShowDatenschutz(true)} className="hover:text-white transition-colors cursor-pointer">Datenschutz</button>
            </div>
          </div>
          {/* Kaffee + Counter */}
          <div className="mt-6 pt-4 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              <span className="font-mono text-red-400 text-sm font-bold">{qrCounter.toLocaleString('de-DE')}</span> QR-Codes erstellt
            </p>
            <a
              href="https://paypal.me/Erguellue"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 font-medium px-4 py-2 rounded-full transition-colors text-xs"
            >
              <Coffee className="w-3.5 h-3.5" />
              Kaffee spendieren ☕
            </a>
          </div>
        </div>
      </footer>

      {/* Impressum Modal */}
      {showImpressum && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowImpressum(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 sm:p-8" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Impressum</h2>
              <button onClick={() => setShowImpressum(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="prose prose-sm text-gray-700 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Angaben gemäß § 5 DDG</h3>
              <p>Bahadir Ergüllü<br />Voisweg 5c<br />40878 Ratingen</p>
              <h3 className="text-lg font-semibold text-gray-900">Kontakt:</h3>
              <p>E-Mail: info@qrcode-no-abo.de</p>
              <h3 className="text-lg font-semibold text-gray-900">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV:</h3>
              <p>Bahadir Ergüllü<br />Voisweg 5c<br />40878 Ratingen</p>
              <h3 className="text-lg font-semibold text-gray-900">Haftungsausschluss:</h3>
              <h4 className="text-base font-semibold text-gray-800">Haftung für Inhalte</h4>
              <p>Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.</p>
              <h4 className="text-base font-semibold text-gray-800">Haftung für Links</h4>
              <p>Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich.</p>
              <h4 className="text-base font-semibold text-gray-800">Urheberrecht</h4>
              <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die erstellten QR-Codes dürfen frei und ohne Einschränkungen verwendet werden.</p>
            </div>
          </div>
        </div>
      )}

      {/* Datenschutz Modal */}
      {showDatenschutz && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowDatenschutz(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 sm:p-8" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Datenschutzerklärung</h2>
              <button onClick={() => setShowDatenschutz(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="prose prose-sm text-gray-700 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">1. Datenschutz auf einen Blick</h3>
              <p>Diese Website verarbeitet KEINE personenbezogenen Daten. Alle Eingaben (Kontaktdaten, URLs) werden ausschließlich in Ihrem Browser verarbeitet und niemals an einen Server übertragen.</p>
              <h3 className="text-lg font-semibold text-gray-900">2. Datenverarbeitung auf dieser Website</h3>
              <h4 className="text-base font-semibold text-gray-800">Hosting</h4>
              <p>Diese Website wird über Cloudflare Pages gehostet. Cloudflare kann technisch bedingt Zugriffsdaten (IP-Adresse, Zeitpunkt des Zugriffs, Browser-Typ) in Server-Logfiles speichern. Details: <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">https://www.cloudflare.com/privacypolicy/</a></p>
              <h4 className="text-base font-semibold text-gray-800">Cloudflare Web Analytics</h4>
              <p>Wir verwenden Cloudflare Web Analytics zur anonymen Besucherstatistik. Dieses Tool verwendet KEINE Cookies und speichert KEINE personenbezogenen Daten. Es werden lediglich aggregierte, anonyme Nutzungsstatistiken erfasst.</p>
              <h4 className="text-base font-semibold text-gray-800">Lokale Datenspeicherung</h4>
              <p>Ihre eingegebenen Daten werden ausschließlich lokal in Ihrem Browser verarbeitet. Es findet keine Übertragung an unsere oder fremde Server statt. Beim Schließen des Browsers werden alle eingegebenen Daten gelöscht, sofern Sie diese nicht selbst als JSON-Datei exportiert haben.</p>
              <h3 className="text-lg font-semibold text-gray-900">3. Ihre Rechte</h3>
              <p>Da wir keine personenbezogenen Daten erheben oder speichern, entfallen die üblichen Betroffenenrechte (Auskunft, Löschung, etc.) in Bezug auf diese Website.</p>
              <h3 className="text-lg font-semibold text-gray-900">4. Verantwortlicher</h3>
              <p>Bahadir Ergüllü<br />Voisweg 5c<br />40878 Ratingen<br />E-Mail: info@qrcode-no-abo.de</p>
            </div>
          </div>
        </div>
      )}

      {/* Slide-up animation */}
      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(1rem); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
