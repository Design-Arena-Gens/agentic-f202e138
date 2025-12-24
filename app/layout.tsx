import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains"
});

export const metadata: Metadata = {
  title: "AI Content Factory Workflow",
  description:
    "Workflow 1: AI Content Factory - Detailed Architecture showcasing a 95% automated pipeline for video production."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="bg-slate-950 text-slate-100">
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#0f172a,_#020617_70%)]">
          {children}
        </div>
      </body>
    </html>
  );
}
