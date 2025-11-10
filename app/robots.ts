import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config"; // Pastikan impor ini benar

export default function robots(): MetadataRoute.Robots {
  // Pastikan siteConfig.siteUrl mengambil https://webkeun.web.id
  const baseUrl = siteConfig.siteUrl || "https://webkeun.web.id"; 

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`, // Ini akan menjadi https://webkeun.web.id/sitemap.xml
  };
}