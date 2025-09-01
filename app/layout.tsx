import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../styles/animations.css";
import Providers from "./providers";
import Header from "../components/Header";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ClarifyMe – AI-Powered Learning Companion",
  description:
    "ClarifyMe helps you learn smarter with AI-generated summaries, quizzes, and curated resources.",
  keywords: [
    "AI learning",
    "topic clarification",
    "quiz generator",
    "study assistant",
    "ClarifyMe",
  ],
  authors: [{ name: "ClarifyMe Team", url: "https://clarifyme.ai" }],
  robots: "index, follow",
  openGraph: {
    title: "ClarifyMe – Learn Smarter with AI",
    description:
      "Summarize any topic, test your knowledge, and discover the best learning resources.",
    url: "https://clarifyme.ai",
    siteName: "ClarifyMe",
    images: [
      { url: "https://clarifyme.ai/og-image.png", width: 1200, height: 630 },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClarifyMe – Learn Smarter with AI",
    description:
      "AI-powered summaries, quizzes, and recommendations.",
    images: ["https://clarifyme.ai/twitter-card.png"],
  },
  metadataBase: new URL("https://clarifyme.ai"),
  alternates: {
    canonical: "https://clarifyme.ai",
  },
  other: {
    "structured-data": `<script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "ClarifyMe",
      "url": "https://clarifyme.ai",
      "description": "AI-powered learning assistant for topic clarification, quizzes, and curated resources.",
      "applicationCategory": "EducationApplication",
      "operatingSystem": "All",
      "creator": {
        "@type": "Organization",
        "name": "ClarifyMe"
      }
    })}</script>`
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="YOUR_GOOGLE_SITE_VERIFICATION" />
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "ClarifyMe",
              "url": "https://clarifyme.ai",
              "description": "AI-powered learning assistant for topic clarification, quizzes, and curated resources.",
              "applicationCategory": "EducationApplication",
              "operatingSystem": "All",
              "creator": {
                "@type": "Organization",
                "name": "ClarifyMe"
              }
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-gradient-to-br from-[#0F4C5C] via-[#6C2DC7] to-[#1A1A1A] text-white`}
      >
        <Providers>
          <Header />
          <main className="flex-1 w-full flex flex-col items-center justify-start animate-fadeInUp" role="main" aria-label="Main content">
            <div className="w-full" role="region">
              {children}
            </div>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}