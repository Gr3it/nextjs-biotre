import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BioTre - Gruppo di Acquisto Solidale",
  description: "Biotre - Gruppo di Acquisto Solidale",
  openGraph: {
    title: "BioTre - Gruppo di Acquisto Solidale",
    description: "Biotre - Gruppo di Acquisto Solidale a Trento",
    images: ["/logo/LogoFull.png"],
  },
  appleWebApp: {
    title: "BioTre",
    statusBarStyle: "default",
    capable: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${inter.variable} ${lora.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
