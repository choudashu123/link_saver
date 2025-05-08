import { connectDB } from '@/lib/db';
import Bookmark from '@/models/Bookmark';
import { fetchMetadata } from '@/utils/fetchMetadata';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(req: Request) {
  await connectDB();
  const user = await getUserFromRequest(req);
  const { url } = await req.json();
  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }
  const metadata = await fetchMetadata(url);
  const bookmark = await Bookmark.create({ ...metadata, url, userId: user._id });
  return new Response(JSON.stringify(bookmark));
}

// export async function GET(req: Request) {
//   await connectDB();
//   const user = await getUserFromRequest(req);
//   if (!user) {
//     return new Response('Unauthorized', { status: 401 });
//   }
//   const bookmarks = await Bookmark.find({ userId: user._id });
//   return new Response(JSON.stringify(bookmarks), { 
//     headers: { 'Content-Type': 'application/json' }
// });
// }
export async function GET(req: Request) {
  await connectDB();
  console.log('Connected to DB');

  const user = await getUserFromRequest(req);
  if (!user) {
    console.log('User not found or unauthorized');
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const bookmarks = await Bookmark.find({ userId: user._id });
    console.log('Fetched bookmarks:', bookmarks);
    
    return new Response(JSON.stringify(bookmarks), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    return new Response('Error fetching bookmarks', { status: 500 });
  }
}
