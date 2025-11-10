// Lokasi file: app/api/news/route.ts
import { NextResponse } from 'next/server';
import { fetchNewsData } from '@/lib/data';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = searchParams.toString();

    // Panggil fungsi data fetching sisi server, teruskan parameter
    const posts = await fetchNewsData(queryParams);

    return NextResponse.json(posts);

  } catch (error) {
    // Tangani error tak terduga
    console.error("Error in API route:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
