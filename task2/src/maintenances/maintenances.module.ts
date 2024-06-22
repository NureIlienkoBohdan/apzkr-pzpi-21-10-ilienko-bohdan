// src/maintenances/maintenances.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaintenancesService } from './maintenances.service';
import { MaintenancesController } from './maintenances.controller';
import { MaintenanceRecord } from './entities/maintenance.entity';
import { Drone } from 'src/drones/entities/drone.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MaintenanceRecord, Drone, User])],
  controllers: [MaintenancesController],
  providers: [MaintenancesService],
})
export class MaintenancesModule {}
