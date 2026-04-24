import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Tasks API')
    .setDescription(
      'Api to manage Tasks, basic notifications and authentication with JWT',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);
  const port = config.get<number>('PORT') ?? 3000;

  await app.listen(port);
  console.log(`🚀 Server running on port ${port}`);
  console.log(`�swagger Docs available at http://localhost:${port}/docs`);
}
bootstrap();
