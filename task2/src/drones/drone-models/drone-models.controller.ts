import { Body, Controller, Post } from '@nestjs/common';
import { DroneModelsService } from './drone-models.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateDroneModelDto } from './dto/create-drone-model.dto';

@ApiTags('drones/drone-models')
@Controller('drone-models')
export class DroneModelsController {
  constructor(private droneModelsService: DroneModelsService) {}

  @Post()
  create(@Body() createDroneModelDto: CreateDroneModelDto) {
    return this.droneModelsService.create(createDroneModelDto);
  }
}
