import BlogList from "@/components/BlogList";
import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import { fetchNewsData } from "@/lib/data";

const PAGE_SIZE = 9;

type BlogPageProps = {
  searchParams?: {
    page?: string;
  };
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  
  const { posts, totalResults } = await fetchNewsData(
    `q=teknologi&language=id&pageSize=${PAGE_SIZE}&page=${currentPage}`
  );

  const totalPages = Math.ceil(totalResults / PAGE_SIZE);

  return (
    <main className="relative isolate overflow-hidden bg-white">
      <PageHeader
        title="Wawasan & Inspirasi Terbaru"
        subtitle="Jelajahi artikel kami tentang desain, pengembangan, dan strategi digital."
      />
      <div className="mx-auto max-w-screen-xl px-6 lg:px-8 py-10 sm:py-14">
        <BlogList posts={posts} />
        <div className="mt-12 flex justify-end">
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            basePath="/blog" 
          />
        </div>
      </div>
    </main>
  );
}
