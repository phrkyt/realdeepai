import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Property Search",
  description: "Deep AI powered home finder",
  icons: {
    icon: '/favicon.ico', // Path to the ICO file
    apple: '/apple-touch-icon.png',
    other: [
      {
          rel: 'icon',
          type: 'image/png',
          sizes: '192x192',
          url: '/android-chrome-192x192.png', // Android icon 192x192
      },
      {
          rel: 'icon',
          type: 'image/png',
          sizes: '512x512',
          url: '/android-chrome-512x512.png', // Android icon 512x512
      },
  ],
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics /> {/* Add the Analytics component here */}
      </body>
    </html>
  );
}
