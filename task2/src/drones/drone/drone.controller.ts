import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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
  @Role([Roles.ADMIN])
  @UseGuards(AccessTokenGuard, RoleGuard)
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
    summary: 'Update drone',
    operationId: 'updateDrone',
    description: 'This endpoint is used to update drone',
  })
  @Patch()
  update(@Body() updateDroneDto: UpdateDroneDto) {
    return this.droneService.update({
      ownerId: '60f4c3e3e5f2a4d9e6b2e0e9',
      droneId: '60f4c3e3e5f2a4d9e6b2e0e9',
      updateDroneDto,
    });
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
