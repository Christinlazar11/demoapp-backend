import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
const EXPIRES_IN = '1d';

export function signAdminToken(payload: object): string {
  return jwt.sign({...payload}, JWT_SECRET, { expiresIn: EXPIRES_IN });
}

export function verifyAdminToken(token: string): string | JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}
