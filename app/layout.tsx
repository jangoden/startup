import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import Script from 'next/script'; // <-- 1. IMPORT SCRIPT

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "webkeun - Layanan IT Profesional",
  description: "Solusi IT untuk bisnis Anda",
};

// <-- 2. ID PENGUKURAN ANDA DARI SNIPPET
const GA_TRACKING_ID = 'G-35BGSZT3MQ'; 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${plusJakarta.className} antialiased bg-slate-50 text-slate-800`}>
        
        {/* 3. TAMBAHKAN KODE GOOGLE ANALYTICS DI SINI */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          strategy="afterInteractive" 
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `}
        </Script>
        
        <Navbar />
        <main className="pt-[var(--header-h)]">{children}</main>
        <Footer />

        {/* Tombol WhatsApp global */}
        <FloatingWhatsAppButton />
      </body>
    </html>
  );
}