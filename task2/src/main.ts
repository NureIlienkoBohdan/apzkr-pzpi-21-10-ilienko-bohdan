import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configSwagger } from 'core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  configSwagger(app);

  // Configure CORS
  app.enableCors({
    origin: '*', // Specify the origin of your React app
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable credentials (cookies, authorization headers)
  });

  await app.listen(3000);

  Logger.log(`🌐 Server running on http://localhost:3000`, 'Bootstrap');
  Logger.log(
    `📚 Swagger running on http://localhost:3000/api/docs`,
    'Bootstrap',
  );
}
bootstrap();
