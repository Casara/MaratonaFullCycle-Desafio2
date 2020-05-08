import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      // http2: true,
      logger: true,
    }),
    {
      cors: true
    }
  );
  const configService = app.get(ConfigService);
  const port: number = configService.get<number>('PORT');

  const options = new DocumentBuilder()
    .setTitle('Maratona Full Cycle 2.0')
    .setDescription('Plataforma Lives')
    .setVersion('1.0')
    .setContact('Rodrigo Casara', 'https://github.com/Casara', 'rodrigocasara@gmail.com')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port, '0.0.0.0');
}
bootstrap();
