// lib/postsData.ts
import { PostCardProps } from './types';

export const postsData: PostCardProps[] = [
  {
    slug: '5-tren-desain-web-terbaru',
    title: '5 Tren Desain Web Terbaru yang Wajib Anda Ketahui',
    excerpt:
      'Dunia desain web terus berkembang. Ketahui 5 tren terbaru yang akan mendominasi tahun ini, mulai dari...',
    imageUrl: '/images/placeholder-template.png', // Ganti dengan path gambar Anda
    date: '2025-08-25T10:00:00Z', // Gunakan format ISO 8601 untuk konsistensi
    author: {
      name: 'Admin',
    },
    category: {
      name: 'Desain Web',
    },
  },
  {
    slug: 'mengoptimalkan-seo-untuk-pemula',
    title: 'Panduan Lengkap Mengoptimalkan SEO untuk Pemula',
    excerpt:
      'SEO tidak harus rumit. Pelajari dasar-dasar optimisasi mesin pencari untuk meningkatkan peringkat situs Anda.',
    imageUrl: '/images/placeholder-template.png',
    date: '2025-09-02T14:30:00Z',
    author: {
      name: 'Admin',
    },
    category: {
      name: 'SEO',
    },
  },
  {
    slug: 'perkenalan-react-server-components',
    title: 'Perkenalan React Server Components: Apa dan Mengapa?',
    excerpt:
      'React Server Components mengubah cara kita membangun aplikasi. Pahami konsep dasarnya dan keuntungannya.',
    imageUrl: '/images/placeholder-template.png',
    date: '2025-09-10T11:00:00Z',
    author: {
      name: 'Admin',
    },
    category: {
      name: 'Pengembangan Web',
    },
  },
  {
    slug: 'membangun-api-dengan-nextjs',
    title: 'Cara Cepat Membangun API Routes di Next.js',
    excerpt:
      'Next.js tidak hanya untuk frontend. Manfaatkan API Routes untuk membangun backend yang cepat dan terintegrasi.',
    imageUrl: '/images/placeholder-template.png',
    date: '2025-09-18T09:00:00Z',
    author: {
      name: 'Admin',
    },
    category: {
      name: 'Pengembangan Web',
    },
  },
  {
    slug: 'keamanan-website-dasar',
    title: '5 Langkah Dasar Mengamankan Website Anda dari Hacker',
    excerpt:
      'Jangan tunggu sampai terlambat. Terapkan 5 langkah sederhana ini untuk melindungi website Anda dari ancaman umum.',
    imageUrl: '/images/placeholder-template.png',
    date: '2025-09-25T16:00:00Z',
    author: {
      name: 'Admin',
    },
    category: {
      name: 'Keamanan',
    },
  },
];
