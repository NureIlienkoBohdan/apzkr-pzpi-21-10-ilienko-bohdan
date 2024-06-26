import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configSwagger, getPort } from 'core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.setGlobalPrefix('api');

  configSwagger(app);

  // Configure CORS
  app.enableCors({
    origin: '*', // Specify the origin of your React app
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable credentials (cookies, authorization headers)
  });

  const PORT = getPort();

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      url: 'mqtt://localhost:1883',
    },
  });

  await app.startAllMicroservices();

  await app.listen(PORT);

  Logger.log(`🌐 Server running on http://localhost:${PORT}`, 'Bootstrap');
  Logger.log(
    `📚 Swagger running on http://localhost:${PORT}/api/docs`,
    'Bootstrap',
  );
}
bootstrap();
