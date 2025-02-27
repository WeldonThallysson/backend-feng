import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { VercelRequest, VercelResponse } from '@vercel/node';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors()
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

export default async function handler(req: VercelRequest, res:VercelResponse) {
  const app = await NestFactory.create(AppModule);
  await app.init();
  app.getHttpAdapter().getInstance()(req, res);
}
