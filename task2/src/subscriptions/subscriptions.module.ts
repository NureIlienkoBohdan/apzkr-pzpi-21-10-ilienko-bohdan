// src/subscriptions/subscriptions.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { Subscription } from './entities/subscription.entity';
import { UserBalance } from 'src/billings/entities/user-balances.entity';
import { Transaction } from 'src/billings/entities/transactions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription, UserBalance, Transaction])],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService],
})
export class SubscriptionsModule {}
