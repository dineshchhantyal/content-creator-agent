import { type Metadata, type Viewport } from "next";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";

// Add a separate export for viewport configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0a09" },
  ],
};

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
        url: "/og-image.jpg",
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
    images: ["/og-image.jpg"],
    creator: "@dineshchhantyal",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" }, // Simplified path
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" }, // Simplified path
    shortcut: "/favicon-16x16.png",
  },
  manifest: "/site.webmanifest",
  applicationName: "CreatorAI",
  appleWebApp: {
    capable: true,
    title: "CreatorAI",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ClientWrapper>{children}</ClientWrapper>;
}
