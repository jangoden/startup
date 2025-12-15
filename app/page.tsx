// app/page.tsx
import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import ServicesSummary from '@/components/ServicesSummary';
import WhyChooseUs from '@/components/WhyChooseUs';
import LogoCarousel from '@/components/LogoCarousel';
import Pricing from '@/components/Pricing';
// import CTASection from '@/components/CTASection';
import BlogList from '@/components/BlogList';

import { fetchNewsData } from '@/lib/data';

/* -------------------------------------------------------------------------- */
/*                                   SEO META                                 */
/* -------------------------------------------------------------------------- */

const SITE_URL = 'https://webkeun.web.id';
const SITE_NAME = 'WarungWeb';
const DEFAULT_TITLE = 'Warung Web | Jasa Website Murah & Solusi Transformasi Digital';
const DEFAULT_DESCRIPTION =
  'Partner transformasi digital Anda. Jasa pembuatan website, aplikasi custom, dan optimasi SEO untuk meningkatkan pertumbuhan bisnis.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },

  description: DEFAULT_DESCRIPTION,

  keywords: [
    'jasa website murah',
    'jasa pembuatan website',
    'web developer indonesia',
    'jasa SEO',
    'website UMKM',
    'transformasi digital bisnis',
  ],

  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'WarungWeb - Jasa Website & Transformasi Digital',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ['/og-image.png'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

/* -------------------------------------------------------------------------- */
/*                                   PAGE                                     */
/* -------------------------------------------------------------------------- */

export default async function Home() {
  const { posts: recentPosts } = await fetchNewsData(
    'q=teknologi&language=id&pageSize=3'
  );

  return (
    <main id="main-content" className="flex flex-col">
      {/* H1 utama sebaiknya ada di Hero component */}
      <Hero />

      <ServicesSummary />
      <WhyChooseUs />
      <LogoCarousel />
      <Pricing />
      {/* <CTASection /> */}

      {/* Blog Section */}
      <section
        aria-labelledby="blog-heading"
        className="bg-gray-50 py-20 sm:py-28"
      >
        <div className="container mx-auto px-6">
          <header className="text-center max-w-2xl mx-auto">
            <h2
              id="blog-heading"
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              Artikel & Insight Terbaru
            </h2>
            <p className="mt-4 text-gray-600">
              Tips website, SEO, dan transformasi digital untuk mengembangkan
              bisnis Anda.
            </p>
          </header>

          <div className="mt-16">
            <BlogList posts={recentPosts} />
          </div>
        </div>
      </section>
    </main>
  );
}
