// lib/data.ts
import type {
  PostCardProps,
  NewsApiResponse,
  NewsApiArticle,
  NewsApiErrorResponse,
  InternalApiErrorResponse,
} from './types';

function mapNewsArticleToPostCard(article: NewsApiArticle): PostCardProps {
  return {
    slug: article.url,
    title: article.title,
    imageUrl: article.urlToImage || '/images/placeholder-template.png',
    date: article.publishedAt,
    excerpt: article.description || 'Baca selengkapnya...',
    author: {
      name: article.source.name || 'Sumber Tidak Diketahui',
    },
    category: {
      name: 'Berita',
    },
  };
}

export async function fetchNewsData(queryParams?: string): Promise<PostCardProps[]> {
  try {
    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) {
      console.error('NEWS_API_KEY is not set.');
      return [];
    }
    
    const query = queryParams || 'q=teknologi&language=id&pageSize=12';
    const apiUrl = `https://newsapi.org/v2/everything?${query}&apiKey=${apiKey}`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.error(`Failed to fetch from NewsAPI: ${response.statusText}`);
      return [];
    }

    const data: NewsApiResponse | NewsApiErrorResponse = await response.json();

    if (data.status !== 'ok') {
      console.error(`NewsAPI returned an error: ${data.message}`);
      return [];
    }

    return data.articles.map(mapNewsArticleToPostCard);
  } catch (error) {
    console.error('Error in fetchNewsData:', error);
    return [];
  }
}

export async function getPosts(): Promise<PostCardProps[]> {
  try {
    const apiUrl = '/api/news';
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch from internal API: ${response.statusText}`);
    }

    const data: PostCardProps[] | InternalApiErrorResponse = await response.json();

    // Type guard to check for our custom error response
    if ('error' in data) {
      throw new Error(data.error);
    }

    // If it's not an error, it should be the array of posts
    if (Array.isArray(data)) {
      return data;
    }

    // If the format is unexpected, throw an error
    throw new Error('Invalid response format from API.');

  } catch (error) {
    console.error('Error in getPosts:', error);
    return [];
  }
}
