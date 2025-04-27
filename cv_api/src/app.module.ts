import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './supabase/supabase.module';
import { LinkTypeModule } from './link-type/link-type.module';
import { LoggerMiddleware } from './logger/logger.middleware';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    SupabaseModule,
    LinkTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware) // dùng LoggerMiddleware
      .forRoutes(
        { path: 'link-type', method: RequestMethod.GET },
      );
  }
}
