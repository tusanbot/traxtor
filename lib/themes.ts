export type GraphicTheme = {
  id: string;
  name: string;
  description: string;
  colors: { primary: string; primaryDark: string; secondary: string; accent: string; background: string; surface: string; text: string; muted: string };
  pattern: string;
  motif: "stadium" | "supporters" | "shield";
  football: boolean;
  wolf: boolean;
};

export const graphicThemes: GraphicTheme[] = [
  { id: "tractor-red", name: "تراکتور قرمز", description: "هویت اصلی فن‌پیج با قرمز، مشکی و خردلی", colors: { primary: "#D71920", primaryDark: "#8F0F15", secondary: "#111111", accent: "#D4A72C", background: "#080808", surface: "#151515", text: "#FFFFFF", muted: "#A1A1AA" }, pattern: "radial-gradient(circle at 80% 10%,rgba(215,25,32,.42),transparent 30%),radial-gradient(circle at 15% 75%,rgba(212,167,44,.14),transparent 30%)", motif: "stadium", football: true, wolf: false },
  { id: "stadium-night", name: "شب ورزشگاه", description: "نورافکن ورزشگاه، مشکی عمیق و قرمز درخشان", colors: { primary: "#EF233C", primaryDark: "#9B1020", secondary: "#111318", accent: "#E5B83A", background: "#050608", surface: "#111318", text: "#FFFFFF", muted: "#9CA3AF" }, pattern: "radial-gradient(circle at 50% -10%,rgba(239,35,60,.5),transparent 45%),radial-gradient(circle at 10% 80%,rgba(229,184,58,.12),transparent 30%)", motif: "supporters", football: true, wolf: false },
  { id: "classic-red", name: "قرمز کلاسیک", description: "استایل رسمی‌تر با قاب‌های آماری و حس رسانه‌ای", colors: { primary: "#B5121B", primaryDark: "#6F0A10", secondary: "#1B1B1B", accent: "#C99B2E", background: "#101010", surface: "#1B1B1B", text: "#FFFFFF", muted: "#A3A3A3" }, pattern: "radial-gradient(circle at 85% 15%,rgba(181,18,27,.28),transparent 28%),linear-gradient(135deg,rgba(201,155,46,.09),transparent 45%)", motif: "shield", football: true, wolf: false },
];

export const getGraphicTheme = (id?: string) => graphicThemes.find((theme) => theme.id === id) ?? graphicThemes[0];
