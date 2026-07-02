import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { AuthProvider } from "@/components/AuthProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "von Neumann — AI Automation Agency",
  description:
    "von Neumann builds AI that grows your audience and runs your operations — viral video, hands-off social media, custom chatbots, AI receptionists, data analysis, and computer vision.",
  metadataBase: new URL("https://vonneumann.ai"),
  openGraph: {
    title: "von Neumann — AI Automation Agency",
    description:
      "AI that grows your audience and runs your operations — viral video, social media on autopilot, custom chatbots, AI receptionists, data analysis, and computer vision.",
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
      <body className="font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
