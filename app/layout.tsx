import "./globals.css";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pirsom Tamir - פרסום תמיר",
  description: "תצוגה נוחה של הזמנות, חשבוניות וסיכום תזרימי",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body className={rubik.className}>{children}</body>
    </html>
  );
}
