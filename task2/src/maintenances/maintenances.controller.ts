// src/maintenances/maintenances.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MaintenancesService } from './maintenances.service';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';
import { MaintenanceRecord } from './entities/maintenance.entity';
import { AccessTokenGuard, Role, RoleGuard, Roles, UserId } from 'core';

@ApiTags('maintenances')
@Controller('maintenances')
export class MaintenancesController {
  constructor(private readonly maintenancesService: MaintenancesService) {}

  @ApiOperation({ summary: 'Create a maintenance record' })
  @ApiBearerAuth()
  @Post()
  @Role([Roles.ADMIN, Roles.WORKER])
  @UseGuards(AccessTokenGuard, RoleGuard)
  @ApiResponse({
    status: 201,
    description: 'The maintenance record has been successfully created.',
    type: MaintenanceRecord,
  })
  create(
    @UserId() userId: string,
    @Body() createMaintenanceDto: CreateMaintenanceDto,
  ) {
    return this.maintenancesService.create(userId, createMaintenanceDto);
  }

  @ApiOperation({ summary: 'Get all maintenance records' })
  @ApiBearerAuth()
  @Get()
  @Role([Roles.ADMIN, Roles.WORKER])
  @UseGuards(AccessTokenGuard, RoleGuard)
  @ApiResponse({
    status: 200,
    description: 'Return all maintenance records',
    type: [MaintenanceRecord],
  })
  findAll() {
    return this.maintenancesService.findAll();
  }

  @ApiOperation({ summary: 'Get a maintenance record by ID' })
  @ApiBearerAuth()
  @Get(':id')
  @Role([Roles.ADMIN, Roles.WORKER])
  @UseGuards(AccessTokenGuard, RoleGuard)
  @ApiResponse({
    status: 200,
    description: 'Return a maintenance record by ID',
    type: MaintenanceRecord,
  })
  findOne(@Param('id') id: string) {
    return this.maintenancesService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a maintenance record by ID' })
  @ApiBearerAuth()
  @Patch(':id')
  @Role([Roles.ADMIN, Roles.WORKER])
  @UseGuards(AccessTokenGuard, RoleGuard)
  @ApiResponse({
    status: 200,
    description: 'The maintenance record has been successfully updated.',
    type: MaintenanceRecord,
  })
  update(
    @Param('id') id: string,
    @Body() updateMaintenanceDto: UpdateMaintenanceDto,
  ) {
    return this.maintenancesService.update(id, updateMaintenanceDto);
  }

  @ApiOperation({ summary: 'Delete a maintenance record by ID' })
  @ApiBearerAuth()
  @Delete(':id')
  @Role([Roles.ADMIN])
  @UseGuards(AccessTokenGuard, RoleGuard)
  @ApiResponse({
    status: 200,
    description: 'The maintenance record has been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return this.maintenancesService.remove(id);
  }
}
