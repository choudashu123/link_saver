import { connectDB } from '@/lib/db';
import Bookmark from '@/models/Bookmark';
import { getUserFromRequest } from '@/lib/auth';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const user = await getUserFromRequest(req);
  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }
  await Bookmark.findOneAndDelete({ _id: params.id, userId: user._id });
  return new Response("Deleted");
}
