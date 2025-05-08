import { connectDB } from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  await connectDB();
  const { email, password } = await req.json();
  const hashed = await bcrypt.hash(password, 10);
  await User.create({ email, password: hashed });
  return new Response(JSON.stringify({ ok: true }));
}
