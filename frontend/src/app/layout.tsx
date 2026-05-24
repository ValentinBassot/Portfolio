import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Valentin Bassot | Cybersecurity Student at Epitech",
    template: "%s | Valentin Bassot",
  },
  description: "Portfolio of Valentin Bassot, Cybersecurity student at Epitech. Explore my journey, projects, skills, and open-source contributions.",
  keywords: ["Valentin Bassot", "Portfolio", "Cybersecurity", "Epitech", "Full Stack Developer", "Software Engineer"],
  authors: [{ name: "Valentin Bassot" }],
  creator: "Valentin Bassot",
  openGraph: {
    title: "Valentin Bassot | Portfolio",
    description: "Cybersecurity student at Epitech. Discover my projects and skills.",
    url: "https://valentinbassot.com",
    siteName: "Valentin Bassot Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white relative">
        <Navbar />
        <main className="grow relative">
          {children}
        </main>
      </body>
    </html>
  );
}
