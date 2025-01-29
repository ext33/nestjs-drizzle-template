import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { ALLOW_CORS, SERVER_PORT } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.enableCors({
    origin: ALLOW_CORS.split(','),
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('WStories')
    .setDescription('The WStories API documentation')
    .setVersion('1.0')
    .addCookieAuth('access_token')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger/docs', app, document, {
    url: `http://localhost:${SERVER_PORT}`,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  app.use(cookieParser());

  await app.listen(SERVER_PORT);
}

void bootstrap();
