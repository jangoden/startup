"use client";

// Ganti tipe impor dari 'Post' menjadi 'PostCardProps'
import { PostCardProps } from '@/lib/types';
import PostCard from './PostCard';

interface BlogListProps {
  // Gunakan tipe baru
  posts: PostCardProps[];
}

export default function BlogList({ posts }: BlogListProps) {
  // Logika 'filteredPosts' dari error Anda
  // Untuk saat ini, kita anggap saja sama dengan 'posts'
  const filteredPosts = posts;

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <PostCard
            key={post.slug}
            post={post}
            // Hapus prop 'isPriority' karena PostCard baru tidak menerimanya
          />
        ))
      ) : (
        <p className="col-span-3 text-center text-gray-500">
          Tidak ada postingan yang ditemukan.
        </p>
      )}
    </div>
  );
}