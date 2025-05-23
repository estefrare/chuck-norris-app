import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chuck Norris App",
  description: "Developed by Esteban Frare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen  sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col gap-[32px] row-start-2 items-center">
            {children}
          </main>
          <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://github.com/estefrare"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/github.svg"
                alt="Github icon"
                width={16}
                height={16}
              />
              Developed by Esteban Frare
            </a>
          </footer>
        </div>
      </body>
    </html>
  );
}
