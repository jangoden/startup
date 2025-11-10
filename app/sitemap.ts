import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config"; // Pastikan impor ini benar
import { fetchNewsData } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Pastikan siteConfig.siteUrl mengambil https://webkeun.web.id
  const baseUrl = siteConfig.siteUrl || "https://webkeun.web.id";

  const { posts } = await fetchNewsData('pageSize=100');

  const makeUrl = (path: string, updated_at?: string) => {
    // ... (kode makeUrl Anda sudah benar) ...
    const item: { url: string; lastModified?: Date } = { url: path };
    if (updated_at) {
      const d = new Date(updated_at);
      if (!isNaN(d.getTime())) {
        item.lastModified = d;
      }
    }
    return item;
  };

  const postUrls = posts.map((post) =>
    makeUrl(post.slug, post.date)
  );

  const staticPages = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/services`, lastModified: new Date() },
    { url: `${baseUrl}/templates`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
  ];

  return [...staticPages, ...postUrls];
}