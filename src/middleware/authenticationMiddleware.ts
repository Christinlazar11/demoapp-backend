import { Request, Response, NextFunction } from 'express';
import { verifyAdminToken } from '../services/jwtService';

interface AdminRequest extends Request {
  admin?: string | import('jsonwebtoken').JwtPayload;
}

export function authenticateAdmin(req: AdminRequest, res: Response, next: NextFunction): void {
  let token;
  if(req.cookies && req.cookies['admin_token']){
   token = req.cookies && req.cookies['admin_token'];
  }else if(req.headers && req.headers.authorization){
    token = req.headers.authorization.split(' ')[1]
  }
  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }
  const decoded = verifyAdminToken(token);
  if (!decoded) {
    res.status(401).json({ message: 'Invalid or expired token' });
    return;
  }
  req.admin = decoded;
  next();
}
