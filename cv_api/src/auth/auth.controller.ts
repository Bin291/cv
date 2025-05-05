import {
  Controller,
  Get,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  async verifyToken(@Headers('authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Missing or invalid Authorization header',
      );
    }

    const idToken = authHeader.split(' ')[1];
    console.log('Parsed ID Token:', idToken); // Debug xem chuỗi đúng chưa
    console.log('[Backend] Nhận token:', idToken); // 👈 THÊM LOG


    return await this.authService.verifyToken(idToken);
  }
}
