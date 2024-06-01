import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getPostgresConfig } from 'core';
import { UsersModule } from './users/users.module';
import * as Joi from 'joi';
import { AuthModule } from './auth/auth.module';
import { DronesModule } from './drones/drones.module';
import { RentalsModule } from './rentals/rentals.module';
import { SupportModule } from './support/support.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { MaintenancesModule } from './maintenances/maintenances.module';
import { LeasingModule } from './leasing/leasing.module';
import { BillingsModule } from './billings/billings.module';

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
    DronesModule,
    RentalsModule,
    SupportModule,
    SubscriptionsModule,
    MaintenancesModule,
    LeasingModule,
    BillingsModule,
  ],
})
export class AppModule {}
