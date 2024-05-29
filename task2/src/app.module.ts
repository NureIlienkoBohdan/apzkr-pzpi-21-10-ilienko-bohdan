import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getPostgresConfig } from 'core';
import { UsersModule } from './users/users.module';
import * as Joi from 'joi';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        POSTGRES_HOST: Joi.string().default('localhost'),
        POSTGRES_PORT: Joi.number().default(5432),
        POSTGRES_USER: Joi.string().default('postgres'),
        POSTGRES_PASSWORD: Joi.string().default('postgres'),
        POSTGRES_DB: Joi.string().default('apz_backend_db'),
      }),
    }),
    TypeOrmModule.forRoot(getPostgresConfig()),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
