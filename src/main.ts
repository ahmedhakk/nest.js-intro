import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*
   * Use Validation Pipes globally
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // what it does? it transform the incoming req to an instance of the DTO class after validation
    }),
  );

  /*
   * Swagger configuration
   */
  const config = new DocumentBuilder()
    .setTitle('Nestjs MasterClass - Blog app API')
    .setDescription('Use the base API URL as http://localhost:3000')
    .setTermsOfService('http://localhost:3000/terms-of-service')
    .setLicense(
      'MIT License',
      'https://github.com/twbs/bootstrap/blob/main/LICENSE',
    )
    .addServer('http://localhost:3000')
    .setVersion('1.0')
    .build();

  // Instantiate Document object
  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
