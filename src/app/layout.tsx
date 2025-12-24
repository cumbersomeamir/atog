import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AIAssistant from "@/components/features/AIAssistant";

export const metadata: Metadata = {
  title: "Atog | Premium Real Estate - Find Your Dream Property",
  description: "Discover premium properties for sale and rent. Atog is your trusted real estate partner with verified listings, expert agents, and market insights.",
  keywords: "real estate, property, homes for sale, apartments for rent, luxury properties, real estate agents",
  openGraph: {
    title: "Atog | Premium Real Estate",
    description: "Find your dream property with Atog - Your trusted real estate partner",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <AIAssistant />
      </body>
    </html>
  );
}
