import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { fetchNewsData } from "@/lib/data";
import { siteConfig } from "@/lib/config";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/blog/json-ld";

// --- helper ---
async function getPostBySlug(slug: string) {
  // ambil banyak dulu biar kemungkinan ketemu besar
  const { posts } = await fetchNewsData(
    "q=teknologi&language=id&pageSize=100"
  );

  const decodedSlug = decodeURIComponent(slug);
  return posts.find((p) => p.slug === decodedSlug);
}

// ⚠️ perhatikan tipe params-nya: Promise<{ slug: string }>
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  // ✅ tunggu dulu
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Artikel Tidak Ditemukan",
      description: "Artikel yang Anda cari tidak dapat ditemukan.",
    };
  }

  const pageUrl = `${siteConfig.siteUrl}/blog/${slug}`;

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
      locale: "id_ID",
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
    },
  };
}

// komponen halaman
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ tunggu dulu sebelum dipakai
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { title, imageUrl, author, date, excerpt } = post;
  const postUrl = `${siteConfig.siteUrl}/blog/${slug}`;

  return (
    <>
      <JsonLd post={post} url={postUrl} />

      <main className="relative isolate overflow-hidden bg-white">
        <PageHeader title={title} subtitle={`Oleh ${author.name}`} />
        <div className="mx-auto max-w-screen-lg px-6 lg:px-8 py-10 sm:py-14">
          <article className="prose lg:prose-xl mx-auto">
            <div className="mb-8">
              <p className="text-sm text-gray-500">
                Dipublikasikan pada{" "}
                {new Date(date || "").toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="relative h-96 w-full mb-8 shadow-lg rounded-lg overflow-hidden">
              <Image
                src={imageUrl}
                alt={`Gambar untuk ${title}`}
                fill
                className="object-cover"
                priority
              />
            </div>
            <p className="lead">{excerpt}</p>

            <div className="mt-12 text-center">
              <a
                href={decodeURIComponent(slug)}
                target="_blank"
                rel="noopener noreferrer nofollow"
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
