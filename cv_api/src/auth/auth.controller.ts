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

  async verifyToken(@Headers('authorization') idToken: string) {
    // console.log(idToken);
    const user = await this.authService.verifyToken(idToken);
    // console.log(user);
    return user;
  }
  @Get('user')
  async getUserByUid(@Headers('uid') uid: string) {
    if (!uid) {
      throw new UnauthorizedException('UID is required');
    }
    const user = await this.authService.getUserByUid(uid);
    return user;
  }
}
