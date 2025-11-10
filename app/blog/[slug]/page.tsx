'use client';

import { useSearchParams, useParams } from 'next/navigation';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';

export default function PostPage() {
  const searchParams = useSearchParams();
  const params = useParams();

  const title = searchParams.get('title') || 'Judul Tidak Tersedia';
  const imageUrl = searchParams.get('imageUrl') || '/images/placeholder-template.png';
  const author = searchParams.get('author') || 'Penulis Tidak Dikenal';
  const date = searchParams.get('date');
  const excerpt = searchParams.get('excerpt') || 'Tidak ada konten yang tersedia.';
  const slug = params.slug;

  return (
    <main className="relative isolate overflow-hidden bg-white">
      <PageHeader title={title} subtitle={`Oleh ${author}`} />
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
            />
          </div>
          <p className="lead">{excerpt}</p>
          {/* Jika ada konten lengkap, bisa ditambahkan di sini */}
          <div className="mt-12 text-center">
            <a 
              href={decodeURIComponent(slug as string)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300"
            >
              Baca Selengkapnya di Situs Asli
            </a>
          </div>
        </article>
      </div>
    </main>
  );
}
