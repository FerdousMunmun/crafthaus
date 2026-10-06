import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { getSEO } from "@/services/api";
import SiteChrome from "@/components/layout/SiteChrome";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEO();

  return {
    title: seo?.metaTitle || "CraftHaus",
    description:
      seo?.metaDescription ||
      "Premium home renovation and carpentry solutions by CraftHaus.",
    keywords: seo?.keywords
      ? seo.keywords.split(",").map((keyword) => keyword.trim())
      : undefined,
    alternates: {
      canonical: seo?.canonicalUrl || undefined,
    },
    openGraph: {
      title: seo?.ogTitle || seo?.metaTitle || "CraftHaus",
      description:
        seo?.ogDescription ||
        seo?.metaDescription ||
        "Premium home renovation and carpentry solutions by CraftHaus.",
      images: seo?.ogImage ? [seo.ogImage] : undefined,
    },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
       className={`${poppins.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
  <SiteChrome>{children}</SiteChrome>
</body>
    </html>
  );
}
