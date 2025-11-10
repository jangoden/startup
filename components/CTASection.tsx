'use client';

import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="bg-accent text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Siap Memulai Proyek Anda?
        </h2>
        <p className="mt-4 text-lg leading-6 text-green-light">
          Hubungi kami sekarang untuk konsultasi gratis dan dapatkan penawaran terbaik.
        </p>
        <div className="mt-8 flex justify-center">
          <Link href="/contact" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-accent bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
              Hubungi Kami
          </Link>
        </div>
      </div>
    </section>
  );
}
