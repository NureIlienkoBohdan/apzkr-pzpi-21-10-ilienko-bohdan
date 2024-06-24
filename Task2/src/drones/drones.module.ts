import { Module } from '@nestjs/common';
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
import { DroneLogsController } from './drone-logs/drone-logs.controller';
import { DroneLogsService } from './drone-logs/drone-logs.service';
import { DroneUsageController } from './drone-usage/drone-usage.controller';
import { DroneUsageService } from './drone-usage/drone-usage.service';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';
import { User } from 'src/users/entities/user.entity';
import { Rental } from 'src/rentals/entities/rental.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Drone,
      DroneUsage,
      User,
      Rental,
      Subscription,
      DroneLog,
      DroneModel,
      DroneLeaseToCompany,
    ]),
  ],
  controllers: [
    DroneController,
    DroneModelsController,
    DroneLogsController,
    DroneUsageController,
  ],
  providers: [
    DroneService,
    DroneModelsService,
    DroneLogsService,
    DroneUsageService,
  ],
})
export class DronesModule {}
