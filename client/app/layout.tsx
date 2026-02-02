import type { Metadata } from "next";
import { Geist_Mono, Space_Grotesk, Unica_One } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans-base",
  subsets: ["latin"],
  display: "swap",
});

const unica = Unica_One({
  variable: "--font-heading",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CatNova | AI PDF Chat",
  description:
    "Chat with your PDFs instantly with a premium, cyberpunk-grade interface.",
  metadataBase: new URL("https://catnova.ai"),
  openGraph: {
    title: "CatNova | AI PDF Chat",
    description: "Upload PDFs and chat with them instantly.",
    url: "https://catnova.ai",
    siteName: "CatNova",
  },
  twitter: {
    card: "summary_large_image",
    title: "CatNova | AI PDF Chat",
    description: "Upload PDFs and chat with them instantly.",
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
        className={`${spaceGrotesk.variable} ${unica.variable} ${geistMono.variable} bg-background text-foreground antialiased`}
      >
        <div className="noise" aria-hidden />
        {children}
      </body>
    </html>
  );
}
