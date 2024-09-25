import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';
import { AppModule } from './app.module';

const httpsOptions = {
  key: fs.readFileSync('./secrets/example.key.pem'),
  cert: fs.readFileSync('./secrets/example.cert.pem'),
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: httpsOptions,
  });
  app.enableCors({
    credentials: true,
    origin: true,
  });
  await app.listen(3900);
}

bootstrap();
