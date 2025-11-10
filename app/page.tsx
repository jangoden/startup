// app/page.tsx
import Hero from "@/components/Hero";
import ServicesSummary from "@/components/ServicesSummary";
import BlogList from "@/components/BlogList";
import WhyChooseUs from "@/components/WhyChooseUs";
import LogoCarousel from "@/components/LogoCarousel";
import CTASection from "@/components/CTASection";
import Pricing from "@/components/Pricing";

import { fetchNewsData } from "@/lib/data"; // Langsung fetch data di server

export default async function Home() {
  // Fetch 3 berita terbaru langsung di server
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
            <p className="mb-3 font-semibold text-emerald-600">Blog Terbaru</p>
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-5xl">
              Wawasan & Berita dari Industri
            </h2>
            <p className="mx-auto max-w-2xl text-base sm:text-lg text-gray-600">
              Ikuti perkembangan terbaru, tren teknologi, dan studi kasus dari tim kami.
            </p>
          </div>
          <div className="mt-16">
            {/* Langsung render BlogList dengan data dari server */}
            <BlogList posts={recentPosts} />
          </div>
        </div>
      </section>
    </main>
  );
}
