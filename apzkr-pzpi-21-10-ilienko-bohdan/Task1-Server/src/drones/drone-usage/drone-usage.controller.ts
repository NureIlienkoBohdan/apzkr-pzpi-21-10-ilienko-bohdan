import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DroneUsageService } from './drone-usage.service';
import { CreateDroneUsageDto } from './dto/create-drone-usage.dto';
import { UpdateDroneUsageDto } from './dto/update-drone-usage.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('drone-usage')
@Controller('drone-usage')
export class DroneUsageController {
  constructor(private readonly droneUsageService: DroneUsageService) {}

  @Post()
  create(@Body() createDroneUsageDto: CreateDroneUsageDto) {
    return this.droneUsageService.create(createDroneUsageDto);
  }

  @Get()
  findAll() {
    return this.droneUsageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.droneUsageService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDroneUsageDto: UpdateDroneUsageDto,
  ) {
    return this.droneUsageService.update(id, updateDroneUsageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.droneUsageService.remove(id);
  }
}
