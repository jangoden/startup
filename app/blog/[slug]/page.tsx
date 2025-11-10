import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { fetchSingleNews } from '@/lib/data';
import { siteConfig } from '@/lib/config';
import PageHeader from '@/components/PageHeader';
import JsonLd from '@/components/blog/json-ld'; // Import komponen JSON-LD

type Props = {
  params: { slug: string };
};

// Langkah 2: Implementasi Metadata Dinamis
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await fetchSingleNews(params.slug);

  if (!post) {
    // Jika tidak ada post, kita bisa kembalikan metadata default atau tidak sama sekali
    return {
      title: 'Artikel Tidak Ditemukan',
      description: 'Artikel yang Anda cari tidak dapat ditemukan.',
    };
  }

  const pageUrl = `${siteConfig.siteUrl}/blog/${params.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: pageUrl,
      siteName: siteConfig.siteName,
      images: [
        {
          url: post.imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: 'id_ID',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
    },
  };
}

// Langkah 1: Refactor Halaman Blog menjadi Server Component
export default async function PostPage({ params }: Props) {
  const post = await fetchSingleNews(params.slug);

  // Jika post tidak ditemukan, tampilkan halaman 404
  if (!post) {
    notFound();
  }

  const { title, imageUrl, author, date, excerpt } = post;
  const postUrl = `${siteConfig.siteUrl}/blog/${params.slug}`;

  return (
    <>
      {/* Langkah 3: Integrasi Data Terstruktur (JSON-LD) */}
      <JsonLd post={post} url={postUrl} />
      
      <main className="relative isolate overflow-hidden bg-white">
        <PageHeader title={title} subtitle={`Oleh ${author.name}`} />
        <div className="mx-auto max-w-screen-lg px-6 lg:px-8 py-10 sm:py-14">
          <article className="prose lg:prose-xl mx-auto">
            <div className="mb-8">
              <p className="text-sm text-gray-500">
                Dipublikasikan pada {new Date(date || '').toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
            <div className="relative h-96 w-full mb-8 shadow-lg rounded-lg overflow-hidden">
              <Image
                src={imageUrl}
                alt={`Gambar untuk ${title}`}
                fill
                className="object-cover"
                priority // Prioritaskan LCP image
              />
            </div>
            <p className="lead">{excerpt}</p>
            
            <div className="mt-12 text-center">
              <a 
                href={decodeURIComponent(params.slug as string)}
                target="_blank"
                rel="noopener noreferrer nofollow" // Tambahkan nofollow untuk link eksternal
                className="inline-block bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300"
              >
                Baca Selengkapnya di Situs Asli
              </a>
            </div>
          </article>
        </div>
      </main>
    </>
  );
}
