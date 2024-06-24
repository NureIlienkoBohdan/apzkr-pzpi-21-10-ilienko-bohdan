import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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

  @Get()
  findAll() {
    return this.droneModelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.droneModelsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDroneModelDto: CreateDroneModelDto,
  ) {
    return this.droneModelsService.update(id, updateDroneModelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.droneModelsService.remove(id);
  }
}
