export type GraphicTheme = {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    primaryDark: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    muted: string;
  };
};

export const graphicThemes: GraphicTheme[] = [
  {
    id: "tractor-red",
    name: "تراکتور قرمز",
    description: "قرمز، مشکی و خردلی؛ هویت اصلی فن‌پیج تراکتور",
    colors: {
      primary: "#D71920",
      primaryDark: "#8F0F15",
      accent: "#D4A72C",
      background: "#080808",
      surface: "#151515",
      text: "#FFFFFF",
      muted: "#A1A1AA",
    },
  },
  {
    id: "stadium-night",
    name: "شب ورزشگاه",
    description: "مشکی عمیق با قرمز درخشان و طلایی",
    colors: {
      primary: "#EF233C",
      primaryDark: "#9B1020",
      accent: "#E5B83A",
      background: "#050608",
      surface: "#111318",
      text: "#FFFFFF",
      muted: "#9CA3AF",
    },
  },
  {
    id: "classic-red",
    name: "قرمز کلاسیک",
    description: "نسخه رسمی‌تر برای طرح‌های آماری و خبری",
    colors: {
      primary: "#B5121B",
      primaryDark: "#6F0A10",
      accent: "#C99B2E",
      background: "#101010",
      surface: "#1B1B1B",
      text: "#FFFFFF",
      muted: "#A3A3A3",
    },
  },
];
