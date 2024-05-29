import { Module } from '@nestjs/common';
import { LeasingService } from './leasing.service';
import { LeasingController } from './leasing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DroneLeaseToCompany } from './entities/leasing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DroneLeaseToCompany])],
  controllers: [LeasingController],
  providers: [LeasingService],
})
export class LeasingModule {}
