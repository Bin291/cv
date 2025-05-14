import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './supabase/supabase.module';
import { LinkTypeModule } from './link-type/link-type.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { HistoryUsersModule } from './history-users/history-users.module';



@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true
    }),
    SupabaseModule,
    LinkTypeModule,
    HistoryUsersModule,
  ],
  controllers: [AppController, AuthController ],
  providers: [AppService, AuthService ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');

  }


}
