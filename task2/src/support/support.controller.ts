// src/support/support.controller.ts
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
import { SupportService } from './support.service';
import { CreateSupportDto } from './dto/create-support.dto';
import { UpdateSupportDto } from './dto/update-support.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';
import { SupportTicket } from './entities/support-ticket.entity';
import {
  AccessTokenGuard,
  AtLeastOneRoleGuard,
  Role,
  RoleGuard,
  Roles,
  UserId,
} from 'core';

@ApiTags('support')
@Controller('support')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @ApiOperation({ summary: 'Create a support ticket' })
  @ApiBearerAuth()
  @Post()
  @UseGuards(AccessTokenGuard)
  @ApiResponse({
    status: 201,
    description: 'The support ticket has been successfully created.',
    type: SupportTicket,
  })
  create(@UserId() userId: string, @Body() createSupportDto: CreateSupportDto) {
    return this.supportService.create(userId, createSupportDto);
  }

  @ApiOperation({ summary: 'Get all support tickets' })
  @ApiBearerAuth()
  @Get()
  @Role([Roles.ADMIN, Roles.WORKER])
  @UseGuards(AccessTokenGuard, AtLeastOneRoleGuard)
  @ApiResponse({
    status: 200,
    description: 'Return all support tickets',
    type: [SupportTicket],
  })
  findAll() {
    return this.supportService.findAll();
  }

  @ApiOperation({ summary: 'Get a support ticket by ID' })
  @ApiBearerAuth()
  @Get(':id')
  @Role([Roles.ADMIN, Roles.WORKER])
  @UseGuards(AccessTokenGuard, AtLeastOneRoleGuard)
  @ApiResponse({
    status: 200,
    description: 'Return a support ticket by ID',
    type: SupportTicket,
  })
  findOne(@Param('id') id: string) {
    return this.supportService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a support ticket as a complaint by ID' })
  @ApiBearerAuth()
  @Patch(':id/complaint')
  @UseGuards(AccessTokenGuard)
  @ApiResponse({
    status: 200,
    description: 'The support ticket has been successfully updated.',
    type: SupportTicket,
  })
  updateAsAComplaint(
    @Param('id') id: string,
    @UserId() userId: string,
    @Body() updateSupportDto: UpdateSupportDto,
  ) {
    return this.supportService.updateAsAComplaint(id, userId, updateSupportDto);
  }

  @ApiOperation({ summary: 'Update a support ticket as a manager by ID' })
  @ApiBearerAuth()
  @Patch(':id/manager')
  @Role([Roles.ADMIN, Roles.WORKER])
  @UseGuards(AccessTokenGuard, AtLeastOneRoleGuard)
  @ApiResponse({
    status: 200,
    description: 'The support ticket has been successfully updated.',
    type: SupportTicket,
  })
  updateAsAManager(
    @Param('id') id: string,
    @UserId() userId: string,
    @Body() updateSupportDto: UpdateSupportDto,
  ) {
    return this.supportService.updateAsAManager(id, userId, updateSupportDto);
  }

  @ApiOperation({ summary: 'Delete a support ticket by ID' })
  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  @ApiResponse({
    status: 200,
    description: 'The support ticket has been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return this.supportService.remove(id);
  }
}
