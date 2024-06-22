import { Module } from '@nestjs/common';
import { DronesService } from './drones.service';
import { DronesController } from './drones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drone } from './entities/drone.entity';
import { DroneUsage } from './entities/drone-usage.entity';
import { DroneLog } from './entities/drone-logs.entity';
import { DroneModel } from './entities/drone-model.entity';
import { DroneController } from './drone/drone.controller';
import { DroneService } from './drone/drone.service';
import { DroneModelsController } from './drone-models/drone-models.controller';
import { DroneModelsService } from './drone-models/drone-models.service';
import { DroneLeaseToCompany } from 'src/leasing/entities/leasing.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Drone,
      DroneUsage,
      DroneLog,
      DroneModel,
      DroneLeaseToCompany,
    ]),
  ],
  controllers: [DronesController, DroneController, DroneModelsController],
  providers: [DronesService, DroneService, DroneModelsService],
})
export class DronesModule {}
