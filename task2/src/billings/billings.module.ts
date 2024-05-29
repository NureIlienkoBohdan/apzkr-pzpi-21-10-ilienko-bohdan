import { Module } from '@nestjs/common';
import { BillingsService } from './billings.service';
import { BillingsController } from './billings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transactions.entity';
import { UserBalance } from './entities/user-balances.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, UserBalance])],
  controllers: [BillingsController],
  providers: [BillingsService],
})
export class BillingsModule {}
