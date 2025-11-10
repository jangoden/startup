// app/page.tsx
import type { Metadata } from 'next'; // <-- 1. IMPORT Metadata
import Hero from "@/components/Hero";
import ServicesSummary from "@/components/ServicesSummary";
import BlogList from "@/components/BlogList";
import WhyChooseUs from "@/components/WhyChooseUs";
import LogoCarousel from "@/components/LogoCarousel";
import CTASection from "@/components/CTASection";
import Pricing from "@/components/Pricing";

import { fetchNewsData } from "@/lib/data";

// <-- 2. TAMBAHKAN BLOK METADATA INI
export const metadata: Metadata = {
  title: 'Webkeun - Jasa Pembuatan Website & Solusi IT Profesional',
  description: 'Partner transformasi digital Anda. Kami menyediakan jasa pembuatan website, aplikasi custom, dan optimasi SEO untuk mendorong pertumbuhan bisnis Anda.',
  
  // Bonus: Tambahkan OpenGraph untuk media sosial
  openGraph: {
    title: 'Webkeun - Jasa Pembuatan Website & Solusi IT Profesional',
    description: 'Partner transformasi digital Anda. Kami menyediakan jasa pembuatan website, aplikasi custom, dan optimasi SEO untuk mendorong pertumbuhan bisnis Anda.',
    url: 'https://webkeun.web.id', // <-- DOMAIN ANDA
    siteName: 'webkeun',
    images: [
      {
        url: 'https://webkeun.web.id/og-image.png', // <-- Ganti dengan URL gambar Anda
        width: 1200,
        height: 630,
        alt: 'Webkeun - Solusi IT Profesional',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  // Bonus: Tambahkan canonical URL
  alternates: {
    canonical: 'https://webkeun.web.id', // <-- DOMAIN ANDA
  },
};
// --- BATAS TAMBAHAN ---


export default async function Home() {
  const { posts: recentPosts } = await fetchNewsData('q=teknologi&language=id&pageSize=3');

  return (
    <main>
      <Hero />
      <ServicesSummary />
      <WhyChooseUs />
      <LogoCarousel />
      <Pricing />
      <CTASection />
      <section className="bg-gray-50 py-20 sm:py-28">
        <div className="container mx-auto px-6">
          <div className="text-center">
            {/* ...sisa kode Anda... */}
          </div>
          <div className="mt-16">
            <BlogList posts={recentPosts} />
          </div>
        </div>
      </section>
    </main>
  );
}