import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ServiceWorker } from "@/components/ServiceWorker";
import { LearnerSync } from "@/components/LearnerSync";

export const metadata: Metadata = {
  metadataBase: new URL("https://learn.zivarukah.com"),
  title: { default: "ZIVA Literacy & Handwriting Coach by ZIVARUKAH", template: "%s · ZIVA Literacy" },
  description:
    "Free reading, phonics, spelling and handwriting practice for Kindergarten, Primary 1 to 6 and JHS 1 to 3 learners in Ghana, by ZIVARUKAH (founder: Shepherd Justice Sarpong Oduro). Works offline once opened.",
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
        <script
          type="application/ld+json"
          // Our own static data: tells search engines this app belongs to ZIVARUKAH and its founder.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "ZIVA Literacy & Handwriting Coach",
              alternateName: ["ZIVA Literacy", "ZIVA Literacy by ZIVARUKAH"],
              url: "https://learn.zivarukah.com/",
              applicationCategory: "EducationalApplication",
              operatingSystem: "Any (web browser, installable)",
              offers: { "@type": "Offer", price: "0", priceCurrency: "GHS" },
              publisher: { "@type": "Organization", "@id": "https://zivarukah.com/#organization", name: "ZIVARUKAH", url: "https://zivarukah.com/" },
              creator: { "@type": "Person", "@id": "https://zivarukah.com/#founder", name: "Shepherd Justice Sarpong Oduro", url: "https://zivarukah.com/about" },
            }).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
