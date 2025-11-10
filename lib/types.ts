// lib/types.ts

export interface PostCardProps {
  slug: string; // Kita akan isi ini dengan URL eksternal
  title: string;
  imageUrl: string;
  date: string; // Kita akan pakai ISO string (publishedAt)
  excerpt: string;
  author: { name: string };
  category: { name: string };
  content?: string | null;
}


// ==========================================================
// TAMBAHKAN TIPE BARU DI BAWAH INI UNTUK NEWSAPI
// ==========================================================

export interface NewsApiArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string; // Ini link ke artikel aslinya
  urlToImage: string | null; // Ini gambar artikelnya
  publishedAt: string; // ISO 8601 date string
  content: string | null;
}

export interface NewsApiResponse {
  status: 'ok'; // Status 'ok' untuk sukses
  totalResults: number;
  articles: NewsApiArticle[];
}

export interface NewsApiErrorResponse {

  status: 'error';

  code?: string;

  message?: string;

}



export interface InternalApiErrorResponse {

  error: string;

}

export interface FetchNewsDataResult {
  posts: PostCardProps[];
  totalResults: number;
}
