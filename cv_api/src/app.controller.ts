import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private static readonly NO_TOKEN_MESSAGE = 'No token provided';

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  getToken(@Req() req: Request): string {
    const token = this.extractTokenFromHeader(req);
    return token ?? AppController.NO_TOKEN_MESSAGE;
  }

private extractTokenFromHeader(req: Request): string | undefined {
      const [tokenType, token] = (req.headers['authorization'] ?? '').split(' ');
      return token;


    }


}
