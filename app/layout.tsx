import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "./common-components/SessionProviderWrapper";
import Providers from "./common-components/Provider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fanatics",
  description: "This project showcases a list of top games, stores, and leader board. Users can explore games, follow leader board, and track their engagement with a diamond management system.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProviderWrapper>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-screen overflow-hidden`}
        >
          <Providers>{children}</Providers>
        </body>
      </html>
    </SessionProviderWrapper>
  );
}

