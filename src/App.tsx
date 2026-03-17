import { useState, useRef, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  QrCode, Download, Copy, User, Mail, Phone, Building, MapPin,
  Globe, Linkedin, FileText, Link, Upload, X, Shield, Smartphone,
  CheckCircle2, Zap, Lock, FileDown, FileUp, Wifi, MessageSquare,
  ChevronDown, ArrowLeft, Coffee, MessageCircle, Palette, AlertTriangle
} from 'lucide-react';
import { LANGUAGES, LangCode } from './i18n';
import { translations } from './translations';

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

// ─── Platform Logos (SVG data URLs for QR code center embedding) ─────────

const SOCIAL_TABS = ['instagram', 'tiktok', 'facebook', 'youtube', 'linkedin', 'twitter', 'whatsapp', 'google-review', 'telefon', 'email', 'sms', 'wifi', 'link'] as const;

const PLATFORM_LOGOS: Record<string, string> = {
  instagram: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="url(#ig)"/><rect x="12" y="12" width="24" height="24" rx="6" stroke="white" stroke-width="2.5" fill="none"/><circle cx="24" cy="24" r="6" stroke="white" stroke-width="2.5" fill="none"/><circle cx="31" cy="17" r="2" fill="white"/><defs><linearGradient id="ig" x1="0" y1="48" x2="48" y2="0"><stop stop-color="#FFC107"/><stop offset=".5" stop-color="#F44336"/><stop offset="1" stop-color="#9C27B0"/></linearGradient></defs></svg>')}`,
  tiktok: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="#000"/><path d="M33 14a7 7 0 01-5-2v14a8 8 0 11-6-7.7v4.2a4 4 0 103 3.8V10h4a7 7 0 005 4z" fill="white"/></svg>')}`,
  facebook: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="#1877F2"/><path d="M29 25l.7-5H25v-3.5c0-1.4.7-2.5 2.6-2.5H30v-4.2s-1.7-.3-3.4-.3c-3.5 0-5.6 2.1-5.6 5.8V20h-4v5h4v12h5V25z" fill="white"/></svg>')}`,
  youtube: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="#FF0000"/><path d="M20 16v16l12-8z" fill="white"/></svg>')}`,
  linkedin: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="#0A66C2"/><path d="M16 20h4v14h-4zM18 14a2.5 2.5 0 110 5 2.5 2.5 0 010-5M24 20h4v2c.8-1.2 2.4-2.5 4.5-2.5 4 0 5.5 2.5 5.5 6.5V34h-4v-7c0-2-.5-3.5-2.5-3.5S28 25 28 27v7h-4z" fill="white"/></svg>')}`,
  twitter: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="#000"/><path d="M28 15h4l-7 8 8 12h-6l-5-7-6 7h-4l8-9-8-11h6l4.5 6.5z" fill="white"/></svg>')}`,
  whatsapp: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="#25D366"/><path d="M24 10c-7.7 0-14 6.3-14 14 0 2.5.7 4.8 1.8 6.8L10 38l7.5-1.7c2 1 4.2 1.7 6.5 1.7 7.7 0 14-6.3 14-14s-6.3-14-14-14zm0 25c-2 0-4-.6-5.7-1.5l-4 1 1-3.8C14.4 29 13.7 27 13.7 24c0-5.7 4.6-10.3 10.3-10.3S34.3 18.3 34.3 24 29.7 35 24 35z" fill="white"/></svg>')}`,
  'google-review': `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 56"><rect width="48" height="56" rx="6" fill="white"/><g transform="translate(4,2)"><path d="M36.6 16.4H20v6h9.5c-.9 3.5-4 6.1-9.5 6.1-5.8 0-10.5-4.7-10.5-10.5S14.2 7.5 20 7.5c2.6 0 5 1 6.8 2.5l4.3-4.3C28 3.2 24.2 1.5 20 1.5 10.3 1.5 2.5 9.3 2.5 19S10.3 36.5 20 36.5 37.5 28.7 37.5 19c0-1-.1-1.8-.3-2.6z" fill="#4285F4"/><path d="M4.8 11.2L10.6 15.5C12.3 11.8 15.8 9.2 20 9.2c2.6 0 5 1 6.8 2.5l4.3-4.3C28 3.2 24.2 1.5 20 1.5 13 1.5 7 5.5 4.8 11.2z" fill="#EA4335"/><path d="M20 36.5c4 0 7.7-1.4 10.5-3.8l-4.9-4c-1.5 1.1-3.4 1.8-5.6 1.8-5.4 0-8.5-3.1-9.5-6.1L4.8 26.8C7 32.5 13 36.5 20 36.5z" fill="#34A853"/><path d="M4.8 26.8c-.5-1.4-.8-2.9-.8-4.5 0-1.6.3-3.1.8-4.5L4.8 11.2C3.5 13.8 2.5 16.8 2.5 19s1 5.2 2.3 7.8z" fill="#FBBC05"/></g><g transform="translate(2,40)"><polygon points="5,0 6.5,4.5 11,4.5 7.5,7.5 8.5,12 5,9 1.5,12 2.5,7.5 -1,4.5 3.5,4.5" fill="#FBBC05"/><polygon points="14,0 15.5,4.5 20,4.5 16.5,7.5 17.5,12 14,9 10.5,12 11.5,7.5 8,4.5 12.5,4.5" fill="#FBBC05"/><polygon points="23,0 24.5,4.5 29,4.5 25.5,7.5 26.5,12 23,9 19.5,12 20.5,7.5 17,4.5 21.5,4.5" fill="#FBBC05"/><polygon points="32,0 33.5,4.5 38,4.5 34.5,7.5 35.5,12 32,9 28.5,12 29.5,7.5 26,4.5 30.5,4.5" fill="#FBBC05"/><polygon points="41,0 42.5,4.5 47,4.5 43.5,7.5 44.5,12 41,9 37.5,12 38.5,7.5 35,4.5 39.5,4.5" fill="#FBBC05"/></g></svg>')}`,
  telefon: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="#16a34a"/><path d="M17 12c-.6 0-1.2.3-1.6.7l-2.8 2.8c-.8.8-1 2-.5 3 2.2 4.5 5.3 8.5 9.2 11.5 3.2 2.5 6.8 4.3 10.4 5.3 1 .3 2.2 0 3-.8l2.8-2.8c.9-.9.9-2.3 0-3.2l-4-4c-.9-.9-2.3-.9-3.2 0l-1.3 1.3c-.3.3-.7.3-1 .1-2-1.2-3.8-2.8-5.2-4.6-1-1.3-1.8-2.7-2.4-4.2-.1-.3 0-.7.2-1l1.3-1.3c.9-.9.9-2.3 0-3.2l-4-4c-.4-.4-1-.7-1.6-.7z" fill="white"/></svg>')}`,
  email: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="#dc2626"/><path d="M12 16l12 8 12-8v16H12z" fill="none" stroke="white" stroke-width="2.5" stroke-linejoin="round"/><path d="M12 16l12 8 12-8" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>')}`,
  sms: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="#7c3aed"/><rect x="10" y="12" width="28" height="20" rx="4" fill="none" stroke="white" stroke-width="2.5"/><path d="M18 36l4-4" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"/><circle cx="19" cy="22" r="2" fill="white"/><circle cx="24" cy="22" r="2" fill="white"/><circle cx="29" cy="22" r="2" fill="white"/></svg>')}`,
  wifi: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="#0284c7"/><path d="M10 20c7.7-6 20.3-6 28 0" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"/><path d="M15 25c5.1-4 12.9-4 18 0" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"/><path d="M20 30c2.6-2 5.4-2 8 0" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"/><circle cx="24" cy="35" r="2" fill="white"/></svg>')}`,
  link: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="#2563eb"/><circle cx="24" cy="24" r="12" fill="none" stroke="white" stroke-width="2.5"/><path d="M12 24h24M24 12c-4 4-4 20 0 24M24 12c4 4 4 20 0 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"/><path d="M13 18h22M13 30h22" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg>')}`,
};

// FAQ_DATA is now generated from translations - see getFaqData() inside App component

// ─── Structured Data (hardcoded in German for SEO) ────────

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
    }
  ]
});

// ─── Frame Types ────────────────────────────────────────────────────────────


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

const FRAME_DEFS = [
  { id: 'none', nameKey: 'frameOhne' as const, hasText: false },
  { id: 'simple', nameKey: 'frameEinfach' as const, hasText: true },
  { id: 'bold', nameKey: 'frameFett' as const, hasText: true },
  { id: 'circle', nameKey: 'frameKreis' as const, hasText: true },
  { id: 'phone', nameKey: 'frameHandy' as const, hasText: true },
  { id: 'phone-dark', nameKey: 'frameHandyDunkel' as const, hasText: true },
  { id: 'clipboard', nameKey: 'frameKlemmbrett' as const, hasText: true },
  { id: 'tablet', nameKey: 'frameTablet' as const, hasText: false },
];

// ─── Frame Selector Component ───────────────────────────────────────────────

function FrameSelector({
  selectedFrame,
  setSelectedFrame,
  frameText,
  setFrameText,
  t,
}: {
  selectedFrame: string;
  setSelectedFrame: (id: string) => void;
  frameText: string;
  setFrameText: (text: string) => void;
  t: import('./i18n').Translations;
}) {
  const activeFrame = FRAME_DEFS.find(f => f.id === selectedFrame);
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{t.qrRahmen}</label>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
        {FRAME_DEFS.map(frame => (
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
              <FramePreview type={frame.id} />
            </div>
            <p className="text-[10px] text-gray-500 text-center mt-1 truncate">{t[frame.nameKey]}</p>
          </button>
        ))}
      </div>
      {selectedFrame !== 'none' && activeFrame?.hasText && (
        <div className="mt-3">
          <label className="block text-xs font-medium text-gray-700 mb-1">{t.rahmenText}</label>
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

function ColorPickerModal({ color, onChange, onClose, t }: { color: string; onChange: (c: string) => void; onClose: () => void; t: import('./i18n').Translations }) {
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
    { name: t.palKlassisch, colors: ['#000000', '#333333', '#555555', '#777777', '#999999'] },
    { name: t.palRotWarm, colors: ['#dc2626', '#ef4444', '#f97316', '#ea580c', '#b91c1c', '#9a3412'] },
    { name: t.palBlauCool, colors: ['#1d4ed8', '#2563eb', '#3b82f6', '#0284c7', '#0369a1', '#1e40af'] },
    { name: t.palGruenNatur, colors: ['#16a34a', '#15803d', '#166534', '#4ade80', '#059669', '#047857'] },
    { name: t.palLilaKreativ, colors: ['#7c3aed', '#8b5cf6', '#a855f7', '#6d28d9', '#9333ea', '#c026d3'] },
    { name: t.palDunkelElegant, colors: ['#0f172a', '#1e293b', '#1a1a2e', '#16213e', '#0f3460', '#264653'] },
    { name: t.palBusiness, colors: ['#1e3a5f', '#2c5282', '#2b6cb0', '#0d47a1', '#283593', '#1565c0'] },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-lg">{t.farbeWaehlen}</h3>
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
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{t.farbton}</label>
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
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{t.saettigung}</label>
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
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{t.helligkeit}</label>
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
            <p className="text-xs text-gray-400 mt-1">{t.dunklerBesser}</p>
          </div>

          {/* Color Palettes */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{t.farbpaletten}</label>
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
            {t.zuruecksetzenBtn}
          </button>
          <div className="flex-1" />
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            {t.abbrechen}
          </button>
          <button
            onClick={() => { onChange(tempColor); onClose(); }}
            className="px-6 py-2 text-sm font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
          >
            {t.uebernehmen}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Color Picker Component ──────────────────────────────────────────────────

function ColorPicker({ color, onChange, t }: { color: string; onChange: (c: string) => void; t: import('./i18n').Translations }) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{t.qrFarbe}</label>
      <button
        onClick={() => setShowPicker(true)}
        className="flex items-center gap-3 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:border-red-400 transition-colors cursor-pointer w-full"
      >
        <div className="w-8 h-8 rounded-lg border-2 border-gray-200 shadow-inner" style={{ backgroundColor: color }} />
        <span className="font-mono text-sm text-gray-700">{color.toUpperCase()}</span>
        <Palette className="w-4 h-4 text-gray-400 ml-auto" />
      </button>

      {showPicker && (
        <ColorPickerModal color={color} onChange={onChange} onClose={() => setShowPicker(false)} t={t} />
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
      const logoSizePt = sizePt * 0.22; // EPS uses fixed 22%
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

function handleDownloadJPEG(ref: React.RefObject<HTMLDivElement | null>, filename: string, sizeCm: number, dpi: number) {
  const container = ref.current;
  if (!container) return;
  const svgs = container.querySelectorAll('svg');
  const svgElement = svgs.length > 1 ? svgs[svgs.length - 1] : svgs[0];
  if (!svgElement) return;
  const basePx = Math.round(sizeCm * dpi / 2.54);
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
  // Logo bleibt im JPEG
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

function generateCompactVCard(data: BusinessCardData): string {
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    data.vorname || data.nachname ? `N:${data.nachname};${data.vorname};;;` : '',
    data.vorname || data.nachname ? `FN:${data.vorname} ${data.nachname}`.trim() : '',
    data.firma ? `ORG:${data.firma}` : '',
    data.telefon ? `TEL;TYPE=WORK,VOICE:${data.telefon}` : (data.mobil ? `TEL;TYPE=CELL:${data.mobil}` : ''),
    data.email ? `EMAIL;TYPE=INTERNET:${data.email}` : '',
    'END:VCARD'
  ].filter(line => line !== '').join('\n');
}

// ─── QR Version Estimation ──────────────────────────────────────────────────

const QR_CAPACITIES: Record<string, number[]> = {
  L: [17, 32, 53, 78, 106, 134, 154, 192, 230, 271, 321, 367, 425, 458, 520, 586, 644, 718, 792, 858],
  M: [14, 26, 42, 62, 84, 106, 122, 152, 180, 213, 251, 287, 331, 362, 412, 450, 504, 560, 624, 666],
  Q: [11, 20, 32, 46, 60, 74, 86, 108, 130, 151, 177, 203, 241, 258, 292, 322, 364, 394, 442, 482],
  H: [7, 14, 24, 34, 44, 58, 64, 84, 98, 119, 137, 155, 177, 194, 220, 250, 280, 310, 338, 382],
};

function estimateQrVersion(dataLength: number, level: string): number {
  const caps = QR_CAPACITIES[level] || QR_CAPACITIES['M'];
  for (let i = 0; i < caps.length; i++) {
    if (dataLength <= caps[i]) return i + 1;
  }
  return caps.length + 1;
}

function getMinPrintSizeCm(version: number): number {
  const modules = 4 * version + 17 + 8;
  return Math.ceil(modules * 0.076 * 10) / 10;
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

// ─── Language Selector Component ─────────────────────────────────────────────

const CAROUSEL_BENEFITS: Record<string, string[]> = {
  'visitenkarte': ['Kontakt direkt ins Adressbuch importieren', 'Kein Abtippen von Telefonnummern mehr', 'Perfekt für Messen und Networking'],
  'link': ['Jede URL als QR-Code', 'Ideal für Flyer, Plakate und Verpackungen', 'Kunden gelangen sofort auf Ihre Website'],
  'google-review': ['Kunden bewerten Sie direkt auf Google', 'Mehr Sterne = mehr Neukunden', 'Perfekt für Restaurants und Geschäfte'],
  'wifi': ['Gäste verbinden sich ohne Passwort-Eingabe', 'Kein umständliches Diktieren mehr', 'Ideal für Hotels, Cafés und Büros'],
  'email': ['Vorausgefüllte E-Mail öffnet sich sofort', 'Empfänger, Betreff und Text vordefiniert', 'Perfekt für Support und Kontaktanfragen'],
  'sms': ['Vorgefertigte SMS mit einem Scan', 'Ideal für Bestellungen und Rückrufe', 'Funktioniert auf jedem Handy'],
  'telefon': ['Ein Scan startet den Anruf', 'Kein Abtippen der Nummer nötig', 'Ideal für Service und Notfallkontakte'],
  'whatsapp': ['Chatten ohne Kontakt speichern zu müssen', 'Vorausgefüllte Nachricht möglich', 'Perfekt für Kundenservice und Bestellungen'],
  'instagram': ['Direkt zum Instagram-Profil', 'Mehr Follower durch Offline-Werbung', 'Ideal für Influencer und Marken'],
  'tiktok': ['Direkt zum TikTok-Profil', 'Follower von Offline zu Online bringen', 'Perfekt für Creator'],
  'facebook': ['Direkt zur Facebook-Seite', 'Mehr Likes und Follower', 'Ideal für lokale Unternehmen'],
  'youtube': ['Direkt zum YouTube-Kanal', 'Mehr Abonnenten gewinnen', 'Ideal für Content Creator'],
  'linkedin': ['Professionelles Networking per Scan', 'Perfekt für Visitenkarten und Events', 'Direkt zum LinkedIn-Profil'],
  'twitter': ['Direkt zum X/Twitter-Profil', 'Follower von Print zu Digital', 'Ideal für Marken und Personen'],
};

function FeatureCarousel({ cards, onSelect }: { cards: { id: TabType; title: string; icon: React.ReactNode; description: string }[]; onSelect: (id: TabType) => void }) {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % cards.length);
        setFade(true);
      }, 400);
    }, 7000);
    return () => clearInterval(timer);
  }, [cards.length]);

  const switchTo = (idx: number) => {
    setFade(false);
    setTimeout(() => {
      setCurrent(idx);
      setFade(true);
    }, 200);
  };

  const card = cards[current];
  const benefits = CAROUSEL_BENEFITS[card.id] || [];

  return (
    <div className="bg-gray-900 py-5 sm:py-6">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Left arrow */}
          <button
            onClick={() => switchTo((current - 1 + cards.length) % cards.length)}
            className="text-gray-500 hover:text-white transition-colors cursor-pointer flex-shrink-0 p-2 hover:bg-gray-800 rounded-full"
          >
            <ChevronDown className="w-6 h-6 rotate-90" />
          </button>

          {/* Card */}
          <button
            onClick={() => onSelect(card.id)}
            className={`flex-1 flex items-start gap-5 sm:gap-6 bg-gray-800/60 hover:bg-gray-700/60 rounded-2xl p-5 sm:p-6 transition-all cursor-pointer group ${fade ? 'opacity-100' : 'opacity-0'}`}
            style={{ transition: 'opacity 0.4s ease-in-out' }}
          >
            <div className="flex-shrink-0 bg-white rounded-xl p-2.5 shadow-lg">
              <QRCodeSVG value="https://qrcode-no-abo.de" size={72} fgColor="#dc2626" level="L" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center gap-2 mb-2">
                {card.icon}
                <h3 className="text-white font-bold text-lg sm:text-xl group-hover:text-red-300 transition-colors">{card.title}</h3>
              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-3">{card.description}</p>
              <ul className="space-y-1">
                {benefits.map((b, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                    <span className="text-green-400 flex-shrink-0">✓</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <span className="hidden md:inline-flex items-center gap-1 text-red-400 text-sm font-semibold flex-shrink-0 group-hover:text-red-300 mt-2">
              Jetzt erstellen →
            </span>
          </button>

          {/* Right arrow */}
          <button
            onClick={() => switchTo((current + 1) % cards.length)}
            className="text-gray-500 hover:text-white transition-colors cursor-pointer flex-shrink-0 p-2 hover:bg-gray-800 rounded-full"
          >
            <ChevronDown className="w-6 h-6 -rotate-90" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-4">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => switchTo(i)}
              className={`h-2 rounded-full transition-all cursor-pointer ${i === current ? 'bg-red-500 w-8' : 'bg-gray-600 hover:bg-gray-500 w-2'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function LanguageSelector({ lang, setLang }: { lang: LangCode; setLang: (l: LangCode) => void }) {
  const [open, setOpen] = useState(false);
  const current = LANGUAGES.find(l => l.code === lang)!;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm transition-colors cursor-pointer"
      >
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full overflow-hidden text-base leading-none"
          style={{ backgroundImage: `url(https://flagcdn.com/w40/${current.code === 'en' ? 'gb' : current.code}.png)`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <span className="text-white font-medium hidden sm:inline">{current.name}</span>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50 max-h-80 overflow-y-auto w-52">
            {LANGUAGES.map(l => (
              <button
                key={l.code}
                onClick={() => { setLang(l.code); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 cursor-pointer ${lang === l.code ? 'bg-red-50 text-red-600 font-medium' : 'text-gray-700'}`}
              >
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full overflow-hidden flex-shrink-0 shadow-sm border border-gray-200"
                  style={{ backgroundImage: `url(https://flagcdn.com/w40/${l.code === 'en' ? 'gb' : l.code}.png)`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                />
                {l.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function App() {
  // Language
  const [lang, setLang] = useState<LangCode>(() => {
    const saved = localStorage.getItem('qr_lang');
    if (saved && translations[saved as LangCode]) return saved as LangCode;
    const browserLang = navigator.language.split('-')[0];
    if (translations[browserLang as LangCode]) return browserLang as LangCode;
    return 'de';
  });

  const t = translations[lang];

  useEffect(() => {
    localStorage.setItem('qr_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  // FAQ data from translations
  const faqData = [
    { question: t.faq1q, answer: t.faq1a },
    { question: t.faq2q, answer: t.faq2a },
    { question: t.faq3q, answer: t.faq3a },
    { question: t.faq4q, answer: t.faq4a },
    { question: t.faq5q, answer: t.faq5a },
    { question: t.faq6q, answer: t.faq6a },
    { question: t.faq7q, answer: t.faq7a },
    { question: t.faq8q, answer: t.faq8a },
    { question: t.faq9q, answer: t.faq9a },
  ];

  const [activeTab, setActiveTab] = useState<TabType>('visitenkarte');
  const [showGenerator, setShowGenerator] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [showImpressum, setShowImpressum] = useState(false);
  const [showDatenschutz, setShowDatenschutz] = useState(false);
  const [showDonate, setShowDonate] = useState(false);

  const openTab = (tab: TabType) => {
    setActiveTab(tab);
    setShowGenerator(true);
    // Auto-enable platform logo for social tabs
    if ((SOCIAL_TABS as readonly string[]).includes(tab) && PLATFORM_LOGOS[tab]) {
      setUsePlatformLogo(true);
      setUseLogo(false);
      setCustomLogo(null);
    }
    window.history.pushState({ generator: true, tab }, '', `#${tab}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // QR Code Counter - Global (Cloudflare KV) + Session (local) + Visitors
  const [globalCounter, setGlobalCounter] = useState(0);
  const [sessionCounter, setSessionCounter] = useState(0);
  const [visitorCount, setVisitorCount] = useState(0);

  // Load stats on mount and after unlock + count visitor once per session
  useEffect(() => {
    fetch('/api/stats').then(r => r.json()).then(d => {
      setGlobalCounter(d.qrCodes);
      setVisitorCount(d.visitors);
    }).catch(() => {});
    // Count visitor once per session
    if (!sessionStorage.getItem('qr_visited')) {
      sessionStorage.setItem('qr_visited', '1');
      fetch('/api/visitor', { method: 'POST' }).then(r => r.json()).then(d => setVisitorCount(d.count)).catch(() => {});
    }
  }, []);

  const incrementCounter = () => {
    setSessionCounter(prev => prev + 1);
    setGlobalCounter(prev => prev + 1);
    fetch('/api/counter', { method: 'POST' }).catch(() => {});
  };

  // Shared QR settings
  const [qrSizeCm, setQrSizeCm] = useState(5);
  const [qrDpi, setQrDpi] = useState(300);
  const [qrColor, setQrColor] = useState('#000000');
  const [customLogo, setCustomLogo] = useState<string | null>(null);
  const [useLogo, setUseLogo] = useState(false);
  const [usePlatformLogo, setUsePlatformLogo] = useState(true);
  const [logoSize, setLogoSize] = useState(22); // % of QR code size
  const qrRef = useRef<HTMLDivElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Frame state
  const [selectedFrame, setSelectedFrame] = useState<string>('none');
  const [frameText, setFrameText] = useState('SCAN ME');

  // Link tab state
  const [linkUrl, setLinkUrl] = useState('');

  // Visitenkarte tab state
  const [formData, setFormData] = useState<BusinessCardData>({ ...EMPTY_FORM });
  const [compactVCard, setCompactVCard] = useState(false);

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
      return 'place:' + input.trim();
    }
    // Try to find place_id in URL parameters
    const placeIdMatch = input.match(/place_id[=:]([A-Za-z0-9_-]+)/);
    if (placeIdMatch) return 'place:' + placeIdMatch[1];
    // Try data= parameter format from Maps URLs (hex format = Place ID)
    const dataMatch = input.match(/!1s(0x[0-9a-f]+:0x[0-9a-f]+)/i);
    if (dataMatch) return 'place:' + dataMatch[1];
    // Google Maps short link or full URL - use directly
    if (input.match(/google\.(com|de)\/maps|maps\.app\.goo\.gl|g\.co\/maps/i)) {
      return 'url:' + input.trim();
    }
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
  const compactVCardData = generateCompactVCard(formData);
  const hasData = Object.values(formData).some(v => v !== '');

  // Compute QR value based on active tab
  const getQrValue = (): string => {
    switch (activeTab) {
      case 'link':
        return linkUrl || '';
      case 'visitenkarte':
        return hasData ? (compactVCard ? compactVCardData : vCardData) : '';
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
        if (googlePlaceId.startsWith('place:')) {
          return `https://search.google.com/local/writereview?placeid=${googlePlaceId.slice(6)}`;
        }
        if (googlePlaceId.startsWith('url:')) {
          return googlePlaceId.slice(4);
        }
        // Fallback: use raw input as URL
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
  const isSocialTab = (SOCIAL_TABS as readonly string[]).includes(activeTab);
  const logoSrc = useLogo && customLogo
    ? customLogo
    : (isSocialTab && usePlatformLogo && PLATFORM_LOGOS[activeTab])
      ? PLATFORM_LOGOS[activeTab]
      : null;

  // QR version & minimum print size estimation
  const qrLevel = logoSrc ? 'Q' : 'M';
  const qrVersion = estimateQrVersion(qrValue.length, qrLevel);
  const qrModules = 4 * qrVersion + 17 + 8;
  const minPrintSizeCm = getMinPrintSizeCm(qrVersion);

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
      setUsePlatformLogo(false);
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
    showToast(t.toastVcfDownload);
  };

  const handleCopyVCard = () => {
    navigator.clipboard.writeText(vCardData);
    showToast(t.toastVcardCopied);
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
    showToast(t.toastJsonExported);
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
        showToast(t.toastJsonImported);
      } catch {
        showToast(t.toastJsonError);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // ─── Passwortschutz (Testphase) ─────────────────────────────────────────────

  // ─── Browser History Support ──────────────────────────────────────────────
  useEffect(() => {
    const handlePopState = () => {
      if (showGenerator) {
        setShowGenerator(false);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [showGenerator]);

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
            {t.pngDownload} ({printPx}px, {qrDpi} DPI)
          </button>
          <button
            onClick={() => { incrementCounter(); handleDownloadSVG(qrRef, `${prefix}.svg`, qrSizeCm, qrDpi); }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors cursor-pointer font-medium"
          >
            <Download className="w-4 h-4" />
            {t.svgDownload}
          </button>
          <button
            onClick={() => { incrementCounter(); handleDownloadEPS(qrRef, `${prefix}.eps`, qrSizeCm, qrColor, logoSrc); }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors cursor-pointer font-medium"
          >
            <Download className="w-4 h-4" />
            {t.epsDownload}
          </button>
          <button
            onClick={() => { incrementCounter(); handleDownloadJPEG(qrRef, `${prefix}-${qrSizeCm}cm-${qrDpi}dpi.jpg`, qrSizeCm, qrDpi); }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors cursor-pointer font-medium"
          >
            <Download className="w-4 h-4" />
            {t.jpegDownload}
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
          {t.pngMitRahmen}
        </button>
        <button
          onClick={() => { incrementCounter(); handleDownloadFrameSVG(qrRef, `${prefix}-${selectedFrame}.svg`); }}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors cursor-pointer font-medium"
        >
          <Download className="w-4 h-4" />
          {t.svgMitRahmen}
        </button>
        <button
          onClick={() => { incrementCounter(); handleDownloadEPS(qrRef, `${prefix}-${selectedFrame}.eps`, qrSizeCm, qrColor, logoSrc); }}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors cursor-pointer font-medium"
        >
          <Download className="w-4 h-4" />
          {t.epsDownload}
        </button>
        <button
          onClick={() => { incrementCounter(); handleDownloadJPEG(qrRef, `${prefix}-${selectedFrame}-${qrSizeCm}cm-${qrDpi}dpi.jpg`, qrSizeCm, qrDpi); }}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors cursor-pointer font-medium"
        >
          <Download className="w-4 h-4" />
          {t.jpegDownload}
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
          {t.qrVorschau}
        </h2>

        {!hasQrValue ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <QrCode className="w-16 h-16 mb-4 opacity-30" />
            <p className="text-center text-sm">{t.datenEingeben}</p>
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
                        height: previewPx * (logoSize / 100),
                        width: previewPx * (logoSize / 100),
                        excavate: true,
                      }
                    : undefined
                }
                frameName={selectedFrame}
                frameText={frameText}
              />
            </div>

            {hasQrValue && (
              <div className="text-center text-xs text-gray-500">
                {qrValue.length} {t.zeichen} · Version {qrVersion} · {qrModules} {t.module}
              </div>
            )}

            <FrameSelector
              selectedFrame={selectedFrame}
              setSelectedFrame={setSelectedFrame}
              frameText={frameText}
              setFrameText={setFrameText}
              t={t}
            />

            {/* Size & DPI */}
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.druckgroesse}: {qrSizeCm} cm
                </label>
                <input
                  type="range" min="2" max="15" step="0.5"
                  value={qrSizeCm}
                  onChange={(e) => setQrSizeCm(parseFloat(e.target.value))}
                  className="w-full accent-red-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>2 cm</span>
                  {hasQrValue && <span className={qrSizeCm < minPrintSizeCm ? 'text-amber-600 font-medium' : 'text-green-600'}>
                    {t.empfohlen}: &ge; {minPrintSizeCm.toFixed(1)} cm
                  </span>}
                  <span>15 cm</span>
                </div>
              </div>

              {qrSizeCm < minPrintSizeCm && hasQrValue && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-800">
                    <p className="font-medium">{t.qrZuKlein}</p>
                    <p className="mt-1">{t.qrMindestgroesse.replace('{size}', minPrintSizeCm.toFixed(1))}</p>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.aufloesung}</label>
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
                {t.ausgabe}: {printPx} x {printPx} px ({qrSizeCm} cm @ {qrDpi} DPI)
              </p>
            </div>

            {/* Logo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.logoMitte}</label>
              <div className="space-y-2">
                {isSocialTab && PLATFORM_LOGOS[activeTab] && (
                  <button
                    onClick={() => { setUsePlatformLogo(true); setUseLogo(false); setCustomLogo(null); }}
                    className={`w-full py-2.5 px-3 rounded-lg border text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                      usePlatformLogo && !useLogo
                        ? 'border-red-500 bg-red-50 text-red-700 font-medium'
                        : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <img src={PLATFORM_LOGOS[activeTab]} alt="" className="w-5 h-5 rounded" />
                    {FEATURE_CARDS.find(c => c.id === activeTab)?.title} Logo
                  </button>
                )}
                <button
                  onClick={() => logoInputRef.current?.click()}
                  className={`w-full py-2 px-3 rounded-lg border text-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                    useLogo && customLogo
                      ? 'border-red-500 bg-red-50 text-red-700 font-medium'
                      : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  {t.eigenesLogo}
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
                    <span className="text-xs text-red-700 flex-1 font-medium">{t.logoAktiv}</span>
                    <button
                      onClick={() => { setCustomLogo(null); setUseLogo(false); }}
                      className="p-1 text-red-500 hover:bg-red-100 rounded cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                <button
                  onClick={() => { setUseLogo(false); setCustomLogo(null); setUsePlatformLogo(false); }}
                  className={`w-full py-2 px-3 rounded-lg border text-sm transition-colors cursor-pointer ${
                    !useLogo && !usePlatformLogo
                      ? 'border-red-500 bg-red-50 text-red-700 font-medium'
                      : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {t.keinLogo}
                </button>
                {logoSrc && (
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Logo-Größe: {logoSize}%</label>
                    <input
                      type="range"
                      min="10"
                      max="35"
                      step="1"
                      value={logoSize}
                      onChange={(e) => setLogoSize(parseInt(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                      <span>10%</span>
                      <span>35%</span>
                    </div>
                    {logoSize > 25 && (
                      <p className="text-xs text-amber-600 mt-1">⚠ Große Logos können die Scanbarkeit beeinträchtigen</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <ColorPicker color={qrColor} onChange={setQrColor} t={t} />

            <DownloadButtons prefix={prefix} />

            {extra}

            <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-xs text-gray-500 font-medium mb-1">{t.qrInhalt}</p>
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
              {t.linkEingeben}
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.urlLink}</label>
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
              {t.wifiNetzwerk}
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.netzwerkname}</label>
              <input
                type="text"
                value={wifiSsid}
                onChange={(e) => setWifiSsid(e.target.value)}
                className={inputClass}
                placeholder="MeinWiFi"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.wifiPasswort}</label>
              <input
                type="text"
                value={wifiPassword}
                onChange={(e) => setWifiPassword(e.target.value)}
                className={inputClass}
                placeholder="Passwort eingeben"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.wifiVerschluesselung}</label>
              <div className="flex gap-2">
                {([['WPA', 'WPA/WPA2'], ['WEP', 'WEP'], ['nopass', t.wifiKeineVerschl]] as const).map(([val, label]) => (
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
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.emailAdresse}</label>
              <input
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                className={inputClass}
                placeholder="beispiel@email.de"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.emailBetreff} ({t.optionalLabel})</label>
              <input
                type="text"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                className={inputClass}
                placeholder="Betreff der E-Mail"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.emailNachricht} ({t.optionalLabel})</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.telNummer}</label>
              <input
                type="tel"
                value={smsNumber}
                onChange={(e) => setSmsNumber(e.target.value)}
                className={inputClass}
                placeholder="+49 170 1234567"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.emailNachricht} ({t.optionalLabel})</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.telNummer}</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.waNummer}</label>
              <input
                type="tel"
                value={waNumber}
                onChange={(e) => setWaNumber(e.target.value)}
                className={inputClass}
                placeholder="+49 170 1234567"
              />
              <p className="text-xs text-gray-400 mt-1">{t.waLandesvorwahl}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.emailNachricht} ({t.optionalLabel})</label>
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
                <p className="text-sm text-white/80">{t.socialInstagram}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.benutzername}</label>
              <input type="text" value={instagramUser} onChange={e => setInstagramUser(e.target.value)}
                className={inputClass}
                placeholder="@maxmustermann" />
            </div>
            {instagramUser && (
              <p className="text-xs text-gray-500">
                {t.profilUrl}: <span className="font-mono text-gray-700">https://instagram.com/{instagramUser.replace('@', '')}</span>
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
                <p className="text-sm text-white/80">{t.socialTiktok}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.benutzername}</label>
              <input type="text" value={tiktokUser} onChange={e => setTiktokUser(e.target.value)}
                className={inputClass}
                placeholder="@maxmustermann" />
            </div>
            {tiktokUser && (
              <p className="text-xs text-gray-500">
                {t.profilUrl}: <span className="font-mono text-gray-700">https://tiktok.com/@{tiktokUser.replace('@', '')}</span>
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
                <p className="text-sm text-white/80">{t.socialFacebook}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.seitenId}</label>
              <input type="text" value={facebookUser} onChange={e => setFacebookUser(e.target.value)}
                className={inputClass}
                placeholder="maxmustermann" />
            </div>
            {facebookUser && (
              <p className="text-xs text-gray-500">
                {t.profilUrl}: <span className="font-mono text-gray-700">https://facebook.com/{facebookUser.replace('@', '')}</span>
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
                <p className="text-sm text-white/80">{t.socialYoutube}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.kanalname}</label>
              <input type="text" value={youtubeChannel} onChange={e => setYoutubeChannel(e.target.value)}
                className={inputClass}
                placeholder="@maxmustermann" />
            </div>
            {youtubeChannel && (
              <p className="text-xs text-gray-500">
                {t.kanalUrl}: <span className="font-mono text-gray-700">https://youtube.com/@{youtubeChannel.replace('@', '')}</span>
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
                <p className="text-sm text-white/80">{t.socialLinkedin}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.profilName}</label>
              <input type="text" value={linkedinUser} onChange={e => setLinkedinUser(e.target.value)}
                className={inputClass}
                placeholder="max-mustermann" />
            </div>
            {linkedinUser && (
              <p className="text-xs text-gray-500">
                {t.profilUrl}: <span className="font-mono text-gray-700">https://linkedin.com/in/{linkedinUser.replace('@', '')}</span>
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
                <p className="text-sm text-white/80">{t.socialTwitter}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.benutzername}</label>
              <input type="text" value={twitterUser} onChange={e => setTwitterUser(e.target.value)}
                className={inputClass}
                placeholder="@maxmustermann" />
            </div>
            {twitterUser && (
              <p className="text-xs text-gray-500">
                {t.profilUrl}: <span className="font-mono text-gray-700">https://x.com/{twitterUser.replace('@', '')}</span>
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
                <h3 className="font-bold text-lg">{t.googleTitle}</h3>
                <p className="text-sm text-white/80">{t.googleDesc}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.googleInput}
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
                <p className="text-sm text-green-800 font-medium">{t.googlePlaceFound}</p>
                <p className="text-xs text-green-700 mt-2">
                  {googlePlaceId.startsWith('place:') ? (
                    <>Bewertungslink: <span className="font-mono">https://search.google.com/local/writereview?placeid={googlePlaceId.slice(6)}</span></>
                  ) : (
                    <>{t.googleLinkFound}</>
                  )}
                </p>
              </div>
            )}

            {googleInput && !googlePlaceId && !googleInput.startsWith('http') && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">{t.googleNotFound}</p>
              </div>
            )}

            {googleInput && !googlePlaceId && googleInput.startsWith('http') && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">{t.googleLinkFound}</p>
              </div>
            )}

            {/* Instructions */}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
              <h4 className="font-semibold text-gray-900 text-sm mb-3">{t.googleHowTo}</h4>
              <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                <li>{t.googleStep1}: <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" className="text-red-600 underline">Google Maps</a></li>
                <li>{t.googleStep2}</li>
                <li>{t.googleStep3}</li>
                <li>{t.googleStep4}</li>
              </ol>
              <div className="mt-3 p-3 bg-white border border-gray-200 rounded-lg">
                <p className="text-xs font-semibold text-gray-700 mb-1">{t.googleAlt}</p>
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
                {t.tabVisitenkarte}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => jsonInputRef.current?.click()}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition-colors cursor-pointer font-medium text-xs"
                >
                  <FileUp className="w-3.5 h-3.5" />
                  {t.jsonLaden}
                </button>
                <button
                  onClick={handleExportJSON}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition-colors cursor-pointer font-medium text-xs"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  {t.jsonSpeichern}
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

            {activeTab === 'visitenkarte' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={compactVCard}
                    onChange={(e) => setCompactVCard(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-blue-800">{t.kompaktModus}</span>
                </label>
                <p className="text-xs text-blue-600 mt-1">{t.kompaktModusDesc}</p>
              </div>
            )}

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.vorname}</label>
                  <input type="text" value={formData.vorname}
                    onChange={(e) => handleInputChange('vorname', e.target.value)}
                    className={inputClass}
                    placeholder="Max" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.nachname}</label>
                  <input type="text" value={formData.nachname}
                    onChange={(e) => handleInputChange('nachname', e.target.value)}
                    className={inputClass}
                    placeholder="Mustermann" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <Building className="w-4 h-4" /> {t.firma}
                </label>
                <input type="text" value={formData.firma}
                  onChange={(e) => handleInputChange('firma', e.target.value)}
                  className={inputClass}
                  placeholder="Muster GmbH" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.position}</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.plz}</label>
                  <input type="text" value={formData.plz}
                    onChange={(e) => handleInputChange('plz', e.target.value)}
                    className={inputClass}
                    placeholder="12345" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.ort}</label>
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
                  {t.felderLeeren}
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
          {t.vcfExport}
        </button>
        <button
          onClick={handleCopyVCard}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer font-medium text-sm"
        >
          <Copy className="w-4 h-4" />
          {t.vcardKopieren}
        </button>
      </div>
      <details className="group">
        <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700 font-medium">
          {t.vcardAnzeigen}
        </summary>
        <pre className="mt-2 p-3 bg-gray-50 rounded-lg text-xs text-gray-600 overflow-x-auto border border-gray-100 whitespace-pre-wrap">
          {vCardData}
        </pre>
      </details>
    </>
  ) : undefined;

  // ─── Feature Cards Data ──────────────────────────────────────────────────────

  const FEATURE_CARDS: { id: TabType; title: string; icon: React.ReactNode; description: string; qrValue: string }[] = [
    { id: 'visitenkarte', title: t.tabVisitenkarte, icon: <User className="w-5 h-5 text-red-600" />, description: t.descVisitenkarte, qrValue: 'BEGIN:VCARD' },
    { id: 'link', title: t.tabLink, icon: <Link className="w-5 h-5 text-red-600" />, description: t.descLink, qrValue: 'https://qrcode-no-abo.de' },
    { id: 'google-review', title: t.tabGoogleReview, icon: <GoogleIcon />, description: t.descGoogleReview, qrValue: 'https://google.com/maps' },
    { id: 'wifi', title: t.tabWifi, icon: <Wifi className="w-5 h-5 text-red-600" />, description: t.descWifi, qrValue: 'WIFI:T:WPA;S:MeinWLAN;;' },
    { id: 'email', title: t.tabEmail, icon: <Mail className="w-5 h-5 text-red-600" />, description: t.descEmail, qrValue: 'mailto:info@example.de' },
    { id: 'sms', title: t.tabSms, icon: <MessageSquare className="w-5 h-5 text-red-600" />, description: t.descSms, qrValue: 'smsto:+49123:Hallo' },
    { id: 'telefon', title: t.tabTelefon, icon: <Phone className="w-5 h-5 text-red-600" />, description: t.descTelefon, qrValue: 'tel:+49123456' },
    { id: 'whatsapp', title: t.tabWhatsapp, icon: <MessageCircle className="w-5 h-5 text-green-600" />, description: t.descWhatsapp, qrValue: 'https://wa.me/49123' },
    { id: 'instagram', title: t.tabInstagram, icon: <InstagramIcon />, description: t.descInstagram, qrValue: 'https://instagram.com' },
    { id: 'tiktok', title: t.tabTiktok, icon: <TikTokIcon />, description: t.descTiktok, qrValue: 'https://tiktok.com' },
    { id: 'facebook', title: t.tabFacebook, icon: <FacebookIcon />, description: t.descFacebook, qrValue: 'https://facebook.com' },
    { id: 'youtube', title: t.tabYoutube, icon: <YouTubeIcon />, description: t.descYoutube, qrValue: 'https://youtube.com' },
    { id: 'linkedin', title: t.tabLinkedin, icon: <LinkedInIcon />, description: t.descLinkedin, qrValue: 'https://linkedin.com' },
    { id: 'twitter', title: t.tabTwitter, icon: <XIcon />, description: t.descTwitter, qrValue: 'https://x.com' },
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
      {/* Beta Banner */}
      <div className="bg-amber-500 text-amber-950 text-center py-1.5 px-4 text-xs sm:text-sm font-medium">
        🚧 Beta-Version — Fehler gefunden? Bitte melden an <a href="mailto:info@qrcode-no-abo.de" className="underline font-bold">info@qrcode-no-abo.de</a>
      </div>

      <header className="bg-gradient-to-r from-red-700 via-red-600 to-rose-600 text-white relative">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-3 sm:py-5">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2.5 bg-white/15 rounded-xl backdrop-blur-sm">
                <QrCode className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                QR-Code Generator
              </h1>
            </div>
            <p className="text-base sm:text-lg font-semibold text-white/90 mb-1">
              {t.subtitle}
            </p>
            {!showGenerator && (
              <>
                <p className="text-xs sm:text-sm text-white/75 max-w-xl mb-1">
                  {t.headerDesc}
                </p>
                {globalCounter > 0 && (
                  <p className="text-white/90 text-sm font-medium">
                    <span className="font-mono text-xl sm:text-2xl font-bold text-white">{globalCounter.toLocaleString('de-DE')}</span>
                    {' '}{t.kostenlosErstellteQR}
                  </p>
                )}
              </>
            )}
            {showGenerator && (
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-2">
                <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium">
                  <Zap className="w-4 h-4" /> {t.kostenlos}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium">
                  <Lock className="w-4 h-4" /> {t.ohneAbo}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium">
                  <Shield className="w-4 h-4" /> {t.ohneRegistrierung}
                </span>
              </div>
            )}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
              <LanguageSelector lang={lang} setLang={setLang} />
            </div>
          </div>
        </div>
      </header>

      {/* Feature Carousel Banner */}
      {!showGenerator && (
        <FeatureCarousel cards={FEATURE_CARDS} onSelect={openTab} />
      )}

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
                {t.zurueckUebersicht}
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
              <h3 className="text-lg font-bold text-gray-900 mb-4">{t.weitereTypen}</h3>
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
              {t.landingTitle}
            </h2>
            <p className="text-gray-500 text-center mb-8 text-sm sm:text-base">
              {t.landingSubtitle}
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
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-600" /> {t.featureTypes}</span>
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-600" /> {t.featureFrames}</span>
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-600" /> {t.featureFormats}</span>
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-600" /> {t.featureBrowser}</span>
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-600" /> {t.featureTracking}</span>
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-600" /> {t.featureOpenSource}</span>
              </div>
            </div>
          </section>

          {/* Why Section */}
          <section className="bg-white py-12 sm:py-16">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
                {t.whyTitle}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: <Zap className="w-6 h-6" />,
                    title: t.whyFreeTitle,
                    desc: t.whyFreeDesc
                  },
                  {
                    icon: <Shield className="w-6 h-6" />,
                    title: t.whyPrivacyTitle,
                    desc: t.whyPrivacyDesc
                  },
                  {
                    icon: <Download className="w-6 h-6" />,
                    title: t.whyFormatsTitle,
                    desc: t.whyFormatsDesc
                  },
                  {
                    icon: <Smartphone className="w-6 h-6" />,
                    title: t.whyMobileTitle,
                    desc: t.whyMobileDesc
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
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">{t.faqTitle}</h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqData.map((faq, i) => (
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
              <p className="text-xs mt-1">{t.footerDesc}</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <button onClick={() => setShowImpressum(true)} className="hover:text-white transition-colors cursor-pointer">{t.impressum}</button>
              <span className="text-gray-600">|</span>
              <button onClick={() => setShowDatenschutz(true)} className="hover:text-white transition-colors cursor-pointer">{t.datenschutz}</button>
              <span className="text-gray-600">|</span>
              <a href="https://github.com/Baha0077/qrcode-no-abo" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
          {/* Kaffee + Counter */}
          <div className="mt-6 pt-4 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-gray-500 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
              <span>
                <span className="font-mono text-red-400 text-sm font-bold">{globalCounter.toLocaleString('de-DE')}</span> {t.qrCodesErstellt}
                {sessionCounter > 0 && (
                  <span className="text-gray-600 ml-1">({sessionCounter})</span>
                )}
              </span>
              <span className="text-gray-700">·</span>
              <span>
                <span className="font-mono text-blue-400 text-sm font-bold">{visitorCount.toLocaleString('de-DE')}</span> Besucher
              </span>
            </div>
            <button
              onClick={() => setShowDonate(true)}
              className="inline-flex items-center gap-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 font-medium px-4 py-2 rounded-full transition-colors text-xs cursor-pointer"
            >
              <Coffee className="w-3.5 h-3.5" />
              {t.kaffeeSpendieren} ☕
            </button>
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
              <p>Bahadir Ergüllü<br />Voisweg 5c<br />40878 Ratingen<br />Deutschland</p>
              <h3 className="text-lg font-semibold text-gray-900">Kontakt:</h3>
              <p>E-Mail: info@qrcode-no-abo.de<br />Telefon: +49 2102 3700800</p>
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
              <p>Diese Website verarbeitet KEINE personenbezogenen Daten. Alle Eingaben (Kontaktdaten, URLs) werden ausschließlich in Ihrem Browser verarbeitet und niemals an einen Server übertragen. Es werden KEINE Cookies gesetzt.</p>
              <h3 className="text-lg font-semibold text-gray-900">2. Hosting</h3>
              <p>Diese Website wird über Cloudflare Workers gehostet. Cloudflare kann technisch bedingt Zugriffsdaten (IP-Adresse, Zeitpunkt des Zugriffs, Browser-Typ) in Server-Logfiles speichern. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem zuverlässigen Hosting). Details: <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">Cloudflare Datenschutzerklärung</a></p>
              <h3 className="text-lg font-semibold text-gray-900">3. Cloudflare Web Analytics</h3>
              <p>Wir verwenden Cloudflare Web Analytics zur anonymen Besucherstatistik. Dieses Tool verwendet <strong>KEINE Cookies</strong> und speichert <strong>KEINE personenbezogenen Daten</strong>. Es werden lediglich aggregierte, anonyme Nutzungsstatistiken erfasst (z.B. Seitenaufrufe, Herkunftsland). Eine Zuordnung zu einzelnen Personen ist nicht möglich. Cloudflare ist unter dem <strong>EU-US Data Privacy Framework (DPF)</strong> zertifiziert. Details: <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">Cloudflare Datenschutzerklärung</a></p>
              <h3 className="text-lg font-semibold text-gray-900">4. Anonyme Zähler</h3>
              <p>Beim Herunterladen eines QR-Codes sowie beim erstmaligen Besuch der Seite wird jeweils ein anonymer Zähler auf unserem Server um 1 erhöht. Dabei werden <strong>keine personenbezogenen Daten</strong> gespeichert - es wird lediglich die Gesamtanzahl gespeichert. Weder IP-Adressen noch andere identifizierende Informationen werden von uns erfasst. Die technisch bedingte Übertragung der IP-Adresse an Cloudflare Workers ist durch Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse) gedeckt.</p>
              <h3 className="text-lg font-semibold text-gray-900">5. Lokale Browserspeicher</h3>
              <p>Ihr Browser speichert lokal (localStorage und sessionStorage) folgende Einstellungen:</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Gewählte Sprache (localStorage - bleibt bis zum Löschen)</li>
                <li>Besuchsstatus für Zähler (sessionStorage - wird beim Schließen des Tabs gelöscht)</li>
              </ul>
              <p>Diese Daten werden <strong>nicht</strong> an unsere Server übertragen und können jederzeit über die Browser-Einstellungen gelöscht werden. Es handelt sich dabei <strong>nicht um Cookies</strong>.</p>
              <h3 className="text-lg font-semibold text-gray-900">6. Ihre eingegebenen Daten</h3>
              <p>Alle Daten, die Sie in die Formulare eingeben (Namen, Telefonnummern, E-Mail-Adressen, URLs etc.), werden <strong>ausschließlich lokal in Ihrem Browser</strong> verarbeitet. Es findet <strong>keine Übertragung</strong> an unsere oder fremde Server statt. Beim Schließen des Browsers werden alle eingegebenen Daten gelöscht, sofern Sie diese nicht selbst als JSON- oder VCF-Datei exportiert haben.</p>
              <h3 className="text-lg font-semibold text-gray-900">7. Externe Dienste</h3>
              <h4 className="text-base font-semibold text-gray-800">Länderflaggen (flagcdn.com)</h4>
              <p>Für die Anzeige der Länderflaggen im Sprach-Selector werden Bilder von <strong>flagcdn.com</strong> geladen. Dabei kann der Anbieter technisch bedingt Ihre IP-Adresse erfahren. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer benutzerfreundlichen Darstellung).</p>
              <h4 className="text-base font-semibold text-gray-800">PayPal (Spenden)</h4>
              <p>Wenn Sie auf den Spenden-Button klicken, werden Sie zu <strong>PayPal</strong> (PayPal (Europe) S.à r.l. et Cie, S.C.A., Luxemburg) weitergeleitet. Dabei wird Ihre IP-Adresse an PayPal übermittelt. Die weitere Datenverarbeitung erfolgt gemäß der <a href="https://www.paypal.com/de/webapps/mpp/ua/privacy-full" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">PayPal Datenschutzerklärung</a>. PayPal ist unter dem EU-US Data Privacy Framework zertifiziert. Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Ihre Einwilligung durch den Klick).</p>
              <h3 className="text-lg font-semibold text-gray-900">8. Ihre Rechte</h3>
              <p>Soweit personenbezogene Daten verarbeitet werden (z.B. IP-Adresse durch Cloudflare), stehen Ihnen folgende Rechte gemäß DSGVO zu:</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
                <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
                <li>Recht auf Löschung (Art. 17 DSGVO)</li>
                <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                <li>Recht auf Widerspruch (Art. 21 DSGVO)</li>
                <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
                <li>Recht auf Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
              </ul>
              <h3 className="text-lg font-semibold text-gray-900">9. Aufsichtsbehörde</h3>
              <p>Zuständige Aufsichtsbehörde:<br />Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW)<br />Kavalleriestraße 2-4<br />40213 Düsseldorf<br /><a href="https://www.ldi.nrw.de" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">www.ldi.nrw.de</a></p>
              <h3 className="text-lg font-semibold text-gray-900">10. Verantwortlicher</h3>
              <p>Bahadir Ergüllü<br />Voisweg 5c<br />40878 Ratingen<br />E-Mail: info@qrcode-no-abo.de<br />Telefon: +49 2102 3700800</p>
            </div>
          </div>
        </div>
      )}

      {/* Donate Modal */}
      {showDonate && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowDonate(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-center text-white">
              <div className="text-4xl mb-2">☕</div>
              <h2 className="text-xl font-bold">Danke für deine Unterstützung!</h2>
              <p className="text-sm text-white/80 mt-1">Dieses Projekt ist 100% kostenlos und werbefrei.</p>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600 text-center mb-4">Wähle einen Betrag:</p>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {[1, 2, 3, 5, 10].map(amount => (
                  <a
                    key={amount}
                    href={`https://paypal.me/Erguellue/${amount}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center py-3 bg-amber-50 hover:bg-amber-100 border-2 border-amber-200 hover:border-amber-400 rounded-xl text-amber-900 font-bold text-lg transition-all cursor-pointer"
                  >
                    {amount}€
                  </a>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-3">
                <div className="flex-1 relative">
                  <input
                    type="number"
                    min="1"
                    step="0.5"
                    placeholder="Freier Betrag"
                    id="donate-amount"
                    className="w-full px-3 py-2.5 pr-8 border-2 border-amber-200 rounded-xl text-amber-900 font-bold text-center focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-600 font-bold">€</span>
                </div>
                <button
                  onClick={() => {
                    const input = document.getElementById('donate-amount') as HTMLInputElement;
                    const val = input?.value;
                    if (val && parseFloat(val) > 0) {
                      window.open(`https://paypal.me/Erguellue/${val}`, '_blank');
                    }
                  }}
                  className="flex items-center justify-center px-5 py-2.5 bg-amber-500 hover:bg-amber-600 rounded-xl text-white font-bold text-sm transition-all cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Spenden →
                </button>
              </div>
              <p className="text-xs text-gray-400 text-center mt-4">Weiterleitung zu PayPal. Keine Registrierung nötig.</p>
            </div>
            <div className="px-6 pb-4">
              <button
                onClick={() => setShowDonate(false)}
                className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
              >
                Schließen
              </button>
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
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
