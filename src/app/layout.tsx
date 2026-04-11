import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

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
    default: "eBills — Free Online Bill & Invoice Generator | Create PDF Instantly",
    template: "%s | eBills",
  },
  description:
    "Free online bill generator and invoice maker. Create GST invoices, payment receipts, quotations, proforma invoices, delivery challans, credit notes & freelancer invoices. Download PDF instantly. No signup fees. Best free billing software for small businesses, freelancers & consultants in India and worldwide.",
  keywords: [
    "bill generator",
    "invoice generator",
    "invoice maker",
    "free invoice generator",
    "online invoice maker",
    "GST invoice generator",
    "GST bill maker",
    "tax invoice generator",
    "receipt generator",
    "payment receipt maker",
    "quotation maker",
    "estimate generator",
    "proforma invoice",
    "delivery challan",
    "credit note generator",
    "freelancer invoice",
    "consultant invoice",
    "billing software",
    "free billing software",
    "invoice PDF download",
    "bill PDF generator",
    "online billing",
    "create bill online",
    "create invoice online",
    "make receipt online",
    "small business invoice",
    "professional invoice template",
    "invoice template free",
    "bill format",
    "invoice format",
    "GST bill format",
    "receipt format",
    "ebills",
    "e-bills",
    "billing platform",
    "invoice app",
    "bill app",
    "generate bill",
    "generate invoice",
    "download invoice",
    "print invoice",
    "business billing",
    "client billing",
    "multi-currency invoice",
    "Indian billing software",
    "free GST software",
  ],
  authors: [{ name: "eBills", url: "https://ebills.co.in" }],
  creator: "eBills",
  publisher: "eBills",
  metadataBase: new URL("https://ebills.co.in"),
  alternates: {
    canonical: "https://ebills.co.in",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://ebills.co.in",
    siteName: "eBills",
    title: "eBills — Free Online Bill & Invoice Generator",
    description:
      "Create professional invoices, GST bills, receipts, quotations & more. Download PDF instantly. 100% free, no hidden charges. 8+ templates for every business need.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "eBills — Free Online Bill Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "eBills — Free Online Bill & Invoice Generator",
    description:
      "Create professional invoices, receipts, quotations & GST bills. Download PDF instantly. 100% free.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "eBills",
    "google-site-verification": "",
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
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
