import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flavor Haven | Authentic Cuisine",
  description:
    "Experience the finest dining at Flavor Haven restaurant. Book your table today and enjoy our exquisite menu featuring gourmet dishes prepared with the freshest ingredients.",
  keywords:
    "restaurant, fine dining, gourmet food, reservations, cuisine, chef, food, dinner, lunch",
  authors: [
    {
      name: "Flavor Haven Restaurant",
      url: "https://flavorhaven.example.com",
    },
  ],
  openGraph: {
    title: "Flavor Haven | Authentic Cuisine",
    description:
      "Experience the finest dining at Flavor Haven. Book your table today and enjoy our exquisite menu.",
    url: "https://flavorhaven.example.com",
    siteName: "Flavor Haven Restaurant",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://flavorhaven.example.com/images/restaurant-interior.jpg",
        width: 1200,
        height: 630,
        alt: "Flavor Haven Restaurant Interior",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flavor Haven | Authentic Cuisine",
    description:
      "Experience the finest dining at Flavor Haven. Book your table today.",
    images: ["https://flavorhaven.example.com/images/restaurant-interior.jpg"],
  },
  robots: {
    index: true,
    follow: true,
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
        <Script id="schema-org" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Restaurant",
              "name": "Flavor Haven",
              "image": "https://flavorhaven.example.com/images/restaurant-interior.jpg",
              "url": "https://flavorhaven.example.com",
              "telephone": "(+91) 80-4567-8901",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "42 Koramangala Main Road",
                "addressLocality": "Bangalore",
                "addressRegion": "Karnataka",
                "postalCode": "560034",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 12.9352,
                "longitude": 77.6245
              },
              "servesCuisine": ["Indian", "Continental", "Asian Fusion"],
              "priceRange": "$$$",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
                  "opens": "11:00",
                  "closes": "21:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Friday", "Saturday"],
                  "opens": "11:00",
                  "closes": "23:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Sunday",
                  "opens": "12:00",
                  "closes": "20:00"
                }
              ],
              "menu": "https://flavorhaven.example.com/menu",
              "acceptsReservations": "True"
            }
          `}
        </Script>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#d97706" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-grow pt-24 overflow-x-hidden">
          <div className="animate-page-transition">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
