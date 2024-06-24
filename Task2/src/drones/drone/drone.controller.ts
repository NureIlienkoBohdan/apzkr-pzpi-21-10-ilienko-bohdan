import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DroneService } from './drone.service';
import { CreateDroneDto } from './dto/create-drone.dto';
import { UpdateDroneDto } from './dto/update-drone.dto';
import { AccessTokenGuard, Role, RoleGuard, Roles } from 'core';

@ApiTags('drones/drone')
@Controller('drone')
export class DroneController {
  constructor(private readonly droneService: DroneService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create drone',
    operationId: 'create',
    description: 'This endpoint is used to create drone',
  })
  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Body() createDroneDto: CreateDroneDto) {
    return this.droneService.create(createDroneDto);
  }

  @ApiOperation({
    summary: 'Find all drones',
    operationId: 'findAll',
    description: 'This endpoint is used to find all drones',
  })
  @Get()
  findAll() {
    return this.droneService.findAll();
  }

  @ApiOperation({
    summary: 'Find available drones',
    operationId: 'findAvailable',
    description:
      'This endpoint is used to find available drones with pricing in the desired currency',
  })
  @Get('available')
  findAvailable(@Query('currency') currency: string = 'USD') {
    return this.droneService.findAvailable(currency);
  }

  @ApiOperation({
    summary: 'Update drone',
    operationId: 'updateDrone',
    description: 'This endpoint is used to update drone',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDroneDto: UpdateDroneDto) {
    return this.droneService.update({ droneId: id, updateDroneDto });
  }

  @ApiOperation({
    summary: 'Delete drone',
    operationId: 'delete',
    description: 'This endpoint is used to delete drone',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.droneService.remove(id);
  }
}
