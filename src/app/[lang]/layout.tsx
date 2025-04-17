import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Locale, locales } from "@/config/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";

const inter = Inter({
  subsets: ["latin"],
  display: "swap", 
  variable: "--font-inter",
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  // Base URL for canonical and OG tags
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.nara-hamburg.de";

  return {
    title: {
      default: dict.metadata.title,
      template: `%s | ${dict.metadata.title}`,
    },
    description: dict.metadata.description,
    keywords: dict.metadata.keywords,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: {
        en: `${baseUrl}/en`,
        de: `${baseUrl}/de`,
      },
    },
    openGraph: {
      type: "website",
      locale: lang,
      url: `${baseUrl}/${lang}`,
      title: dict.metadata.title,
      description: dict.metadata.description,
      siteName: dict.metadata.title,
      images: [
        {
          url: "/images/barNara.jpg",
          width: 1200,
          height: 630,
          alt: dict.metadata.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.metadata.title,
      description: dict.metadata.description,
      images: ["/images/barNara.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },
    verification: {
      google: "google-site-verification-code", // TODO: Add google site verification code
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${inter.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="font-sans">
        <Navbar dict={dict.navbar} currentLocale={lang} />
        <main className="min-h-screen">{children}</main>
        <Footer dict={dict.footer} />
        <StructuredData type="Restaurant" lang={lang} dict={dict} />
      </body>
    </html>
  );
}
