// Language codes and flag emojis
export const LANGUAGES = [
  { code: 'de', name: 'Deutsch', flag: '\u{1F1E9}\u{1F1EA}' },
  { code: 'en', name: 'English', flag: '\u{1F1EC}\u{1F1E7}' },
  { code: 'fr', name: 'Fran\u00e7ais', flag: '\u{1F1EB}\u{1F1F7}' },
  { code: 'es', name: 'Espa\u00f1ol', flag: '\u{1F1EA}\u{1F1F8}' },
  { code: 'it', name: 'Italiano', flag: '\u{1F1EE}\u{1F1F9}' },
  { code: 'pt', name: 'Portugu\u00eas', flag: '\u{1F1F5}\u{1F1F9}' },
  { code: 'nl', name: 'Nederlands', flag: '\u{1F1F3}\u{1F1F1}' },
  { code: 'pl', name: 'Polski', flag: '\u{1F1F5}\u{1F1F1}' },
  { code: 'cs', name: '\u010Ce\u0161tina', flag: '\u{1F1E8}\u{1F1FF}' },
  { code: 'sv', name: 'Svenska', flag: '\u{1F1F8}\u{1F1EA}' },
  { code: 'da', name: 'Dansk', flag: '\u{1F1E9}\u{1F1F0}' },
  { code: 'no', name: 'Norsk', flag: '\u{1F1F3}\u{1F1F4}' },
  { code: 'fi', name: 'Suomi', flag: '\u{1F1EB}\u{1F1EE}' },
  { code: 'el', name: '\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC', flag: '\u{1F1EC}\u{1F1F7}' },
  { code: 'hu', name: 'Magyar', flag: '\u{1F1ED}\u{1F1FA}' },
  { code: 'ro', name: 'Rom\u00e2n\u0103', flag: '\u{1F1F7}\u{1F1F4}' },
  { code: 'bg', name: '\u0411\u044A\u043B\u0433\u0430\u0440\u0441\u043A\u0438', flag: '\u{1F1E7}\u{1F1EC}' },
  { code: 'hr', name: 'Hrvatski', flag: '\u{1F1ED}\u{1F1F7}' },
  { code: 'sk', name: 'Sloven\u010Dina', flag: '\u{1F1F8}\u{1F1F0}' },
  { code: 'sl', name: 'Sloven\u0161\u010Dina', flag: '\u{1F1F8}\u{1F1EE}' },
  { code: 'et', name: 'Eesti', flag: '\u{1F1EA}\u{1F1EA}' },
  { code: 'lv', name: 'Latvie\u0161u', flag: '\u{1F1F1}\u{1F1FB}' },
  { code: 'lt', name: 'Lietuvi\u0173', flag: '\u{1F1F1}\u{1F1F9}' },
  { code: 'tr', name: 'T\u00fcrk\u00e7e', flag: '\u{1F1F9}\u{1F1F7}' },
  { code: 'ru', name: '\u0420\u0443\u0441\u0441\u043A\u0438\u0439', flag: '\u{1F1F7}\u{1F1FA}' },
] as const;

export type LangCode = typeof LANGUAGES[number]['code'];

// Translation keys - keep it flat and simple
export interface Translations {
  // Header
  title: string;
  subtitle: string;
  headerDesc: string;

  // Landing
  landingTitle: string;
  landingSubtitle: string;

  // Tabs
  tabVisitenkarte: string;
  tabLink: string;
  tabGoogleReview: string;
  tabWifi: string;
  tabEmail: string;
  tabSms: string;
  tabTelefon: string;
  tabWhatsapp: string;
  tabInstagram: string;
  tabTiktok: string;
  tabFacebook: string;
  tabYoutube: string;
  tabLinkedin: string;
  tabTwitter: string;

  // Card descriptions
  descVisitenkarte: string;
  descLink: string;
  descGoogleReview: string;
  descWifi: string;
  descEmail: string;
  descSms: string;
  descTelefon: string;
  descWhatsapp: string;
  descInstagram: string;
  descTiktok: string;
  descFacebook: string;
  descYoutube: string;
  descLinkedin: string;
  descTwitter: string;

  // Form labels
  vorname: string;
  nachname: string;
  firma: string;
  position: string;
  email: string;
  telefon: string;
  mobil: string;
  website: string;
  adresse: string;
  plz: string;
  ort: string;
  linkedin: string;
  notizen: string;

  // Actions
  jsonLaden: string;
  jsonSpeichern: string;
  zuruecksetzen: string;
  qrVorschau: string;
  qrRahmen: string;
  rahmenText: string;
  druckgroesse: string;
  aufloesung: string;
  ausgabe: string;
  qrFarbe: string;
  logoMitte: string;
  eigenesLogo: string;
  keinLogo: string;
  logoAktiv: string;

  // Downloads
  pngDownload: string;
  svgDownload: string;
  epsDownload: string;
  jpegDownload: string;
  pngMitRahmen: string;
  svgMitRahmen: string;
  vcfExport: string;
  vcardKopieren: string;
  vcardAnzeigen: string;

  // Color picker
  farbeWaehlen: string;
  farbton: string;
  saettigung: string;
  helligkeit: string;
  farbpaletten: string;
  zuruecksetzenBtn: string;
  abbrechen: string;
  uebernehmen: string;
  dunklerBesser: string;

  // Color palette names
  palKlassisch: string;
  palRotWarm: string;
  palBlauCool: string;
  palGruenNatur: string;
  palLilaKreativ: string;
  palDunkelElegant: string;
  palBusiness: string;

  // Frame names
  frameOhne: string;
  frameEinfach: string;
  frameFett: string;
  frameKreis: string;
  frameHandy: string;
  frameHandyDunkel: string;
  frameKlemmbrett: string;
  frameTablet: string;

  // Footer
  footerDesc: string;
  impressum: string;
  datenschutz: string;
  qrCodesErstellt: string;
  kaffeeSpendieren: string;

  // Other tabs form labels
  urlLink: string;
  linkEingeben: string;
  wifiNetzwerk: string;
  wifiPasswort: string;
  wifiVerschluesselung: string;
  wifiKeineVerschl: string;
  emailAdresse: string;
  emailBetreff: string;
  emailNachricht: string;
  smsNummer: string;
  smsNachricht: string;
  telNummer: string;
  waNummer: string;
  waNachricht: string;
  waLandesvorwahl: string;
  benutzername: string;
  kanalname: string;

  // Google Review
  googleTitle: string;
  googleDesc: string;
  googleInput: string;
  googlePlaceFound: string;
  googleLinkFound: string;
  googleNotFound: string;
  googleHowTo: string;
  googleStep1: string;
  googleStep2: string;
  googleStep3: string;
  googleStep4: string;
  googleAlt: string;

  // Misc
  datenEingeben: string;
  profilUrl: string;
  kanalUrl: string;
  bewertungslink: string;
  weitereTypen: string;
  zurueckUebersicht: string;
  qrInhalt: string;

  // Social media descriptions
  socialInstagram: string;
  socialTiktok: string;
  socialFacebook: string;
  socialYoutube: string;
  socialLinkedin: string;
  socialTwitter: string;
  profilName: string;
  seitenId: string;

  // Testphase
  testphase: string;
  testphaseDesc: string;
  passwort: string;
  zugang: string;

  // Header badges
  kostenlos: string;
  ohneAbo: string;
  ohneRegistrierung: string;

  // Features section
  featureTypes: string;
  featureFrames: string;
  featureFormats: string;
  featureBrowser: string;
  featureTracking: string;
  featureOpenSource: string;

  // Why section
  whyTitle: string;
  whyFreeTitle: string;
  whyFreeDesc: string;
  whyPrivacyTitle: string;
  whyPrivacyDesc: string;
  whyFormatsTitle: string;
  whyFormatsDesc: string;
  whyMobileTitle: string;
  whyMobileDesc: string;

  // Toast messages
  toastVcfDownload: string;
  toastVcardCopied: string;
  toastJsonExported: string;
  toastJsonImported: string;
  toastJsonError: string;
  felderLeeren: string;
  optionalLabel: string;
  netzwerkname: string;

  // FAQ
  faqTitle: string;
  faq1q: string; faq1a: string;
  faq2q: string; faq2a: string;
  faq3q: string; faq3a: string;
  faq4q: string; faq4a: string;
  faq5q: string; faq5a: string;
  faq6q: string; faq6a: string;
  faq7q: string; faq7a: string;
  faq8q: string; faq8a: string;
  faq9q: string; faq9a: string;
}
