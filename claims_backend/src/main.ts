import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
// import * from '../secrets/'

const httpsOptions = {
  // key: fs.readFileSync('./secrets/cert.key'),
  // cert: fs.readFileSync('./secrets/cert.crt'),
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
    // origin: '*',
    // origin: ['https://192.168.3.44:3600/', 'https://localhost:3600/'],
  });
  await app.listen(3900);
}

bootstrap();
