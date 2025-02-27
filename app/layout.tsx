import { type Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AppWithProviders } from "@/components/app-with-providers";

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
    default: "CreatorAI | AI-Powered Content Creation",
    template: "%s | CreatorAI",
  },
  description:
    "Supercharge your content creation workflow with AI-powered tools and templates designed for modern creators",
  keywords: [
    "AI content creation",
    "creator tools",
    "content templates",
    "AI video tools",
    "content workflow",
    "CreatorAI",
    "content automation",
  ],
  authors: [{ name: "Dinesh Chhantyal", url: "https://dineshchhantyal.com" }],
  creator: "Dinesh Chhantyal",
  publisher: "CreatorAI",
  metadataBase: new URL("https://creatorai.dineshchhantyal.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://creatorai.dineshchhantyal.com",
    title: "CreatorAI | AI-Powered Content Creation",
    description:
      "Supercharge your content creation workflow with AI-powered tools and templates",
    siteName: "CreatorAI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CreatorAI - Supercharge your content workflow",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CreatorAI | AI-Powered Content Creation",
    description:
      "Supercharge your content creation workflow with AI-powered tools and templates",
    images: ["/twitter-image.png"],
    creator: "@dineshchhantyal",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
    shortcut: "/favicon-16x16.png",
  },
  manifest: "/site.webmanifest",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  applicationName: "CreatorAI",
  appleWebApp: {
    capable: true,
    title: "CreatorAI",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0a09" },
  ],
};

export default function ClientWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schematicPublishableKey =
    process.env.NEXT_PUBLIC_SCHEMATIC_PUBLISHABLE_KEY;

  if (!schematicPublishableKey) {
    throw new Error(
      "Please provide your Schematic Publishable Key in the NEXT_PUBLIC_SCHEMATIC_PUBLISHABLE_KEY environment variable."
    );
  }
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 flex flex-col min-h-screen`}
        >
          <AppWithProviders>{children}</AppWithProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
