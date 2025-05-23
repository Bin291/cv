import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import './firebase/firebase-admin';




async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const serviceAccount = require('../configs/firebase-key.json');
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
