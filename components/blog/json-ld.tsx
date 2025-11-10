// components/blog/json-ld.tsx

import { PostCardProps } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function JsonLd({ post, url }: { post: PostCardProps; url: string }) {
  const { iso: isoDate } = formatDate(post.date);

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: isoDate,
    dateModified: isoDate, // Asumsi tanggal modifikasi sama dengan publikasi
    author: { "@type": "Person", name: post.author.name || "Admin" },
    image: post.imageUrl || undefined,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
