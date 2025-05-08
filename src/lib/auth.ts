import jwt from 'jsonwebtoken';
import User from '@/models/User';

export async function getUserFromRequest(req: Request) {
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) throw new Error("No token");
  const payload: any = jwt.verify(token, process.env.JWT_SECRET!);
  const user = await User.findById(payload.userId);
  return user;
}
