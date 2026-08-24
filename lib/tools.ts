import {
  BarChart3,
  CircleUserRound,
  LayoutTemplate,
  Shield,
  Trophy,
  Users,
} from "lucide-react";

export type Tool = {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: typeof Trophy;
  available: boolean;
  themeIds?: string[];
  supportsCustomFields?: boolean;
};

export const tools: Tool[] = [
  {
    id: "top-players",
    title: "۵ بازیکن برتر",
    description: "ساخت طرح حرفه‌ای رتبه‌بندی پنج بازیکن برتر با عکس، تیم و امتیاز.",
    category: "آمار و رتبه‌بندی",
    icon: Trophy,
    available: true,
    themeIds: ["tractor-red", "stadium-night", "classic-red"],
    supportsCustomFields: true,
  },
  {
    id: "lineup",
    title: "ترکیب تیم",
    description: "ساخت شماتیک ترکیب تیم روی زمین فوتبال با آرایش دلخواه.",
    category: "ترکیب",
    icon: Users,
    available: true,
    themeIds: ["tractor-red", "stadium-night", "classic-red"],
    supportsCustomFields: true,
  },
  {
    id: "player-card",
    title: "کارت بازیکن",
    description: "ساخت کارت گرافیکی بازیکن همراه با مشخصات و آمار.",
    category: "بازیکنان",
    icon: CircleUserRound,
    available: true,
    themeIds: ["tractor-red", "stadium-night", "classic-red"],
  },
  {
    id: "team-stats",
    title: "آمار تیم",
    description: "نمایش آمار و عملکرد یک تیم در قالب یک طرح گرافیکی.",
    category: "آمار",
    icon: BarChart3,
    available: false,
  },
  {
    id: "match-result",
    title: "نتیجه بازی",
    description: "ساخت طرح نتیجه مسابقه با لوگو، نتیجه و اطلاعات بازی.",
    category: "مسابقات",
    icon: Shield,
    available: false,
  },
  {
    id: "custom-template",
    title: "قالب اختصاصی",
    description: "ساخت و شخصی‌سازی قالب‌های گرافیکی برای رسانه.",
    category: "قالب‌ها",
    icon: LayoutTemplate,
    available: false,
  },
];
