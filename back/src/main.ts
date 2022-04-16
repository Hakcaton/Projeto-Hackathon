import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './tools/middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(logger);
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
