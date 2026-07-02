import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "von Neumann — AI Automation Agency",
  description:
    "von Neumann builds self-replicating AI automation for teams. We design, deploy, and operate agents that run your workflows end to end.",
  metadataBase: new URL("https://vonneumann.ai"),
  openGraph: {
    title: "von Neumann — AI Automation Agency",
    description:
      "Self-replicating AI automation. We design, deploy, and operate agents that run your workflows end to end.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
