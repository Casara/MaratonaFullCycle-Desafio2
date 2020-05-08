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

/*

https://www.npmjs.com/package/object-mapper
https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/docs/rules

https://www.npmjs.com/~nestjscore
https://github.com/nestjs/typescript-starter/blob/master/package.json
https://github.com/nestjs/nest/tree/master/sample/10-fastify

https://morioh.com/p/9dd19ecd36d4
https://dev.to/vinodsr/nestjs-a-backend-nodejs-framework-for-the-enterprise-40m6

https://www.codemag.com/Article/1907081/Nest.js-Step-by-Step
https://www.codemag.com/Article/1909081/Nest.js-Step-by-Step-Part-2
https://codemag.com/Article/2001081/Nest.js-Step-by-Step-Part-3-Users-and-Authentication

https://www.techiediaries.com/nestjs-tutorial-rest-api-crud/


https://blog.logrocket.com/containerized-development-nestjs-docker/
https://blog.logrocket.com/introduction-to-lando/
https://blog.logrocket.com/moving-from-scss-to-styled-components-advantages-and-caveats/

 */
