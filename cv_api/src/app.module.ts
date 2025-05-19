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
import { AddContentService } from './add-content/add-content.service';
import { AddContentController } from './add-content/add-content.controller';
import { AddContentModuleModule } from './add-content/add-content.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    SupabaseModule,
    LinkTypeModule,
    HistoryUsersModule,
    AddContentModuleModule
  ],
  controllers: [AppController, AuthController, AddContentController ],
  providers: [AppService, AuthService, AddContentService ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');

  }


}
