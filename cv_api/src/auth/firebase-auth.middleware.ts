import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor() {}

  async use(req: any, res: any, next: () => void) {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

    console.log('🔒 Middleware đang chạy... TOKEN:', token);
    console.log(token);
    if (!token) {
      throw new UnauthorizedException('Authorization token not found');
    }

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = decodedToken;
      console.log(req.user);
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
