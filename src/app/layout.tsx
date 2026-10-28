import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ServiceWorker } from "@/components/ServiceWorker";
import { LearnerSync } from "@/components/LearnerSync";

export const metadata: Metadata = {
  metadataBase: new URL("https://learn.zivarukah.com"),
  title: { default: "ZIVA Literacy & Handwriting Coach", template: "%s · ZIVA Literacy" },
  description:
    "Free reading, phonics, spelling and handwriting practice for Kindergarten, Primary 1–6 and JHS 1–3 learners in Ghana. Works offline once opened.",
  applicationName: "ZIVA Literacy",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "ZIVA Literacy", statusBarStyle: "default" },
  icons: { icon: "/icons/favicon-48.png", apple: "/icons/apple-180.png" },
  openGraph: { title: "ZIVA Literacy & Handwriting Coach", siteName: "ZIVA Literacy", type: "website", locale: "en_GH", images: ["/icons/icon-512.png"] },
};

export const viewport: Viewport = { themeColor: "#0b69a8", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GH">
      <body className="min-h-dvh antialiased">
        <ServiceWorker />
        <LearnerSync />
        {children}
      </body>
    </html>
  );
}
