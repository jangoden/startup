import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { fetchNewsData } from '@/lib/data'; // Diubah dari fetchSingleNews
import { siteConfig } from '@/lib/config';
import PageHeader from '@/components/PageHeader';
import JsonLd from '@/components/blog/json-ld';

type Props = {
  params: { slug: string };
};

// Helper function to get a single post to avoid repetition
async function getPost(slug: string) {
  // Fetch a larger list to increase the chance of finding the post
  const { posts } = await fetchNewsData('q=teknologi&language=id&pageSize=100');
  const decodedSlug = decodeURIComponent(slug);
  const post = posts.find((p) => p.slug === decodedSlug);
  return post;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
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

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const { title, imageUrl, author, date, excerpt } = post;
  const postUrl = `${siteConfig.siteUrl}/blog/${params.slug}`;

  return (
    <>
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
