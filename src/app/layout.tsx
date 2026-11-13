import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ServiceWorker } from "@/components/ServiceWorker";
import { LearnerSync } from "@/components/LearnerSync";
import { IosInstallGuide } from "@/components/IosInstallGuide";

export const metadata: Metadata = {
  metadataBase: new URL("https://learn.zivarukah.com"),
  title: { default: "ZIVA Learning by ZIVARUKAH", template: "%s · ZIVA Learning" },
  description:
    "Free reading, phonics, spelling and handwriting practice for Kindergarten, Primary 1 to 6 and JHS 1 to 3 learners in Ghana, by ZIVARUKAH (founder: Shepherd Justice Sarpong Oduro). Works offline once opened.",
  applicationName: "ZIVA Learning",
  // Google Search Console ownership code (HTML tag method), set in Vercel.
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined },
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "ZIVA Learning", statusBarStyle: "default" },
  icons: { icon: "/icons/favicon-48.png", apple: "/icons/apple-180.png" },
  openGraph: { title: "ZIVA Learning", siteName: "ZIVA Learning", type: "website", locale: "en_GH", images: ["/icons/icon-512.png"] },
};

export const viewport: Viewport = { themeColor: "#0b69a8", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GH">
      <body className="min-h-dvh antialiased">
        <ServiceWorker />
        <LearnerSync />
        {children}
        <IosInstallGuide />
        <script
          type="application/ld+json"
          // Our own static data: tells search engines this app belongs to ZIVARUKAH and its founder.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "ZIVA Learning",
              alternateName: ["ZIVA Learning by ZIVARUKAH", "ZIVA Literacy", "ZIVA Literacy & Handwriting Coach"],
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
