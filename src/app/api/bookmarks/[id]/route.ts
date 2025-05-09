import { connectDB } from '@/lib/db';
import Bookmark from '@/models/Bookmark';
import { getUserFromRequest } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// export async function DELETE(req: Request, { params }: { params: { id: string } }) {
// export async function DELETE(
//   request: NextRequest,
//   context: { params: { id: string } }
// ) {
//   const id = context.params.id
//   await connectDB();
//   const user = await getUserFromRequest(request);
//   if (!user) {
//     return new Response('Unauthorized', { status: 401 });
//   }
//   const deleted = await Bookmark.findOneAndDelete({ _id: id, userId: user._id });
//   if (!deleted) {
//     return NextResponse.json({ error: 'Bookmark not found' }, { status: 404 });
//   }
//   return new Response("Deleted");
// }
export async function DELETE(
  request:NextRequest,
  context: {params : Promise <{id:string}>}
) {
  const { id } = await context.params
  await connectDB();


  const user = await getUserFromRequest(request);
  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const deleted = await Bookmark.findOneAndDelete({
    _id: id,
    userId: user._id,
  });

  if (!deleted) {
    return NextResponse.json({ error: 'Bookmark not found' }, { status: 404 });
  }

  return new Response('Deleted', { status: 200 });
}
