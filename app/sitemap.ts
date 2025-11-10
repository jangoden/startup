import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { fetchNewsData } from "@/lib/data"; // <-- Impor fungsi data fetching sisi server

// // Fungsi untuk mengambil semua template dari API (dinonaktifkan sementara)
// async function getAllTemplates(): Promise<{ slug: string; updated_at: string }[]> {
//   try {
//     // NOTE: Ini akan gagal saat build karena mencoba memanggil API-nya sendiri.
//     // Perlu dibuatkan fungsi `getTemplates()` seperti `getPosts()` di lib/data.ts
//     const res = await fetch(`${siteConfig.apiUrl}/api/v1/templates`, {
//       next: { revalidate: 3600 },
//     });
//     if (!res.ok) return [];
//     const data = await res.json();
//     return data.data || [];
//   } catch (error) {
//     console.error("Failed to fetch templates for sitemap:", error);
//     return [];
//   }
// }

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.siteUrl || "http://localhost:3000";

  // 1. Ambil data dinamis langsung dari sumbernya
  const { posts } = await fetchNewsData('pageSize=100'); // <-- Panggil fungsi sisi server dan destructure posts
  // const templates = await getAllTemplates(); // <-- Dinonaktifkan sementara

  const makeUrl = (path: string, updated_at?: string) => {
    const item: { url: string; lastModified?: Date } = { url: path };
    if (updated_at) {
      const d = new Date(updated_at);
      if (!isNaN(d.getTime())) {
        item.lastModified = d;
      }
    }
    return item;
  };

  // 'slug' dari fetchNewsData adalah URL lengkap, jadi kita gunakan itu
  const postUrls = posts.map((post) =>
    makeUrl(post.slug, post.date)
  );

  // const templateUrls = templates.map((template) =>
  //   makeUrl(`${baseUrl}/templates/${template.slug}`, template.updated_at)
  // ); // <-- Dinonaktifkan sementara

  // 2. Definisikan halaman statis
  const staticPages = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/services`, lastModified: new Date() },
    { url: `${baseUrl}/templates`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
  ];

  // 3. Gabungkan semua URL
  return [...staticPages, ...postUrls /*, ...templateUrls */]; // <-- Dinonaktifkan sementara
}