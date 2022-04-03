import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IDataBase, MySQL } from './connections/db.connection';

export const db: IDataBase = new MySQL();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
