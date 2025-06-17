import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './supabase/supabase.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AddContentService } from './add-content/add-content.service';
import { AddContentController } from './add-content/add-content.controller';
import { AddContentModuleModule } from './add-content/add-content.module';
import { AuthModule } from './auth/auth.module';
import { ResumeModule } from './resume/resume.module';
import { AuthMiddleware } from './auth/firebase-auth.middleware';
import { LinkModule } from './link/link.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    SupabaseModule,
    AddContentModuleModule,
    AuthModule,
    ResumeModule,
    LinkModule,
  ],
  controllers: [AppController, AuthController, AddContentController ],
  providers: [AppService, AuthService, AddContentService ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*'); // Apply LoggerMiddleware to all routes

    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'resume', method: RequestMethod.POST },
        { path: 'resume', method: RequestMethod.POST },
        { path: 'link', method: RequestMethod.GET },
        { path: 'link', method: RequestMethod.PATCH },
        { path: 'link', method: RequestMethod.DELETE },




        );
  }




}
