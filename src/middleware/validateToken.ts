import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface JwtPayload { _id: string; username: string; isAdmin: boolean; }

export function authenticateUser(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization?.split(' ')[1];
  if (!auth) return res.status(401).json({ message: 'Token not found.' });
  try {
    const payload = jwt.verify(auth, process.env.SECRET!) as JwtPayload;
    (req as any).user = payload;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token.' });
  }
}

export function authenticateAdmin(req: Request, res: Response, next: NextFunction) {
  authenticateUser(req, res, () => {
    if (!(req as any).user.isAdmin) {
      return res.status(403).json({ message: 'Access denied.' });
    }
    next();
  });
}
