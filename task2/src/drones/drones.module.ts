import { Module } from '@nestjs/common';
import { DronesService } from './drones.service';
import { DronesController } from './drones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drone } from './entities/drone.entity';
import { DroneUsage } from './entities/drone-usage.entity';
import { DroneLog } from './entities/drone-logs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Drone, DroneUsage, DroneLog])],
  controllers: [DronesController],
  providers: [DronesService],
})
export class DronesModule {}
