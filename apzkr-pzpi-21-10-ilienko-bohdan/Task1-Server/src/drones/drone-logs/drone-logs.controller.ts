import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DroneLogsService } from './drone-logs.service';
import { CreateDroneLogDto } from './dto/create-drone-log.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { EventPattern } from '@nestjs/microservices';
import { AccessTokenGuard } from 'core';

@ApiTags('drone-logs')
@Controller('drone-logs')
export class DroneLogsController {
  constructor(private readonly droneLogService: DroneLogsService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @ApiOperation({
    summary: 'Create a new drone log entry',
    description: 'Create a new log entry for a drone',
  })
  create(@Body() createDroneLogDto: CreateDroneLogDto) {
    return this.droneLogService.create(createDroneLogDto);
  }

  @EventPattern('drone/log')
  handleLogEvent(createDroneLogDto: CreateDroneLogDto) {
    return this.droneLogService.create(createDroneLogDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all drone logs',
    description: 'Retrieve all drone log entries',
  })
  findAll() {
    return this.droneLogService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a drone log by ID',
    description: 'Retrieve a specific drone log entry by its ID',
  })
  findOne(@Param('id') id: string) {
    return this.droneLogService.findOne(id);
  }

  @Get('drone/:droneId')
  @ApiOperation({
    summary: 'Get logs for a specific drone',
    description: 'Retrieve all log entries for a specific drone',
  })
  findByDroneId(@Param('droneId') droneId: string) {
    return this.droneLogService.findByDroneId(droneId);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a drone log by ID',
    description: 'Delete a specific drone log entry by its ID',
  })
  remove(@Param('id') id: string) {
    return this.droneLogService.remove(id);
  }
}
