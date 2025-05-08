import jwt from 'jsonwebtoken';
import User from '@/models/User'

type JwtPayload = {
  userId: string;
  iat?: number;
  exp?: number;
};

export async function getUserFromRequest(req: Request) {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) {
    throw new Error('No token provided');
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const user = await User.findById(payload.userId);
    return user;
  } catch (err) {
    console.error('JWT verification failed:', err);
    throw new Error('Invalid or expired token');
  }
}

