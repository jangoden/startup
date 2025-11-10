'use client';

import { useState, useEffect } from 'react';
import BlogList from "@/components/BlogList";
import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import type { PostCardProps } from "@/lib/types";
import api from '@/lib/axios'; // Menggunakan instance axios yang aman

const PAGE_SIZE = 9;

export default function BlogPage() {
  const [posts, setPosts] = useState<PostCardProps[]>([]);
  const [page, ] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        // API route '/api/news' sekarang mengembalikan PostCardProps[] yang sudah jadi.
        const response = await api.get('/news', {
          params: {
            q: 'technology', // atau topik lain yang relevan
            page,
            pageSize: PAGE_SIZE,
          },
        });

        // response.data sekarang adalah array PostCardProps[]
        const postsData: PostCardProps[] = response.data;

        if (!Array.isArray(postsData)) {
          throw new Error('Format respons tidak valid dari server.');
        }

        // TODO: API perlu dikembangkan untuk mengembalikan totalResults
        // agar paginasi berfungsi dengan benar. Untuk saat ini, kita nonaktifkan.
        const calculatedTotalPages = 1; // Math.ceil(totalResults / PAGE_SIZE);

        setPosts(postsData);
        setTotalPages(calculatedTotalPages);
      } catch (err) {
        console.error("Gagal mengambil berita:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Gagal memuat berita. Silakan coba lagi nanti.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [page]);

  return (
    <main className="relative isolate overflow-hidden bg-white">
      <PageHeader
        title="Wawasan & Inspirasi Terbaru"
        subtitle="Jelajahi artikel kami tentang desain, pengembangan, dan strategi digital."
      />
      <div className="mx-auto max-w-screen-xl px-6 lg:px-8 py-10 sm:py-14">
        {loading ? (
          <div className="text-center">Memuat berita...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <>
            <BlogList posts={posts} />
            <Pagination currentPage={page} totalPages={totalPages} basePath="/blog?" />
          </>
        )}
      </div>
    </main>
  );
}
