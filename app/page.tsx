// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Hero from "@/components/Hero";
import ServicesSummary from "@/components/ServicesSummary";
import BlogList from "@/components/BlogList";
import WhyChooseUs from "@/components/WhyChooseUs";
import LogoCarousel from "@/components/LogoCarousel";
import CTASection from "@/components/CTASection";
// import Contact from "@/components/Contact";
import Pricing from "@/components/Pricing";

import api from '@/lib/axios'; // Menggunakan instance axios yang aman
import type { PostCardProps } from "@/lib/types";

export default function Home() {
  const [recentPosts, setRecentPosts] = useState<PostCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 50,
      easing: "ease-in-out",
    });

    const fetchRecentNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/news', {
          params: {
            q: 'technology', // atau topik lain yang relevan
            page: 1,
            pageSize: 3,
          },
        });
        
        // response.data sekarang adalah array PostCardProps[]
        const postsData: PostCardProps[] = response.data;

        if (!Array.isArray(postsData)) {
          throw new Error('Format respons tidak valid dari server.');
        }

        setRecentPosts(postsData);
      } catch (err) {
        console.error("Gagal mengambil berita terbaru:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Gagal memuat berita terbaru. Silakan coba lagi nanti.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecentNews();
  }, []);

  return (
    <main>
      <Hero />
      <ServicesSummary />
      <WhyChooseUs />
      <LogoCarousel />
      <Pricing />
      <CTASection />
      {/* <Contact /> */}
      <section className="bg-gray-50 py-20 sm:py-28">
        <div className="container mx-auto px-6">
          <div className="text-center" data-aos="fade-up">
            <p className="mb-3 font-semibold text-emerald-600">Blog Terbaru</p>
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-5xl">
              Wawasan & Berita dari Industri
            </h2>
            <p className="mx-auto max-w-2xl text-base sm:text-lg text-gray-600">
              Ikuti perkembangan terbaru, tren teknologi, dan studi kasus dari tim kami.
            </p>
          </div>
          <div className="mt-16">
            {loading ? (
              <div className="text-center">Memuat berita...</div>
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : (
              <BlogList posts={recentPosts} />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
