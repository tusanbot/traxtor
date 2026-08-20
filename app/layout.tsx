import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Traxtor | ابزارهای طراحی فوتبالی",
  description:
    "ابزارهای حرفه‌ای ساخت طرح‌های آماری و گرافیکی فوتبال",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
