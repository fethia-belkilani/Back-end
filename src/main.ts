import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3030);
}
bootstrap();
//  json-server --watch -p 4000 tvioo.json

//  Bundle exec rails server webrick -e production