// src/rentals/rentals.controller.ts

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
import { RentalsService } from './rentals.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { AccessTokenGuard, Role, RoleGuard, Roles, UserId } from 'core';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('rentals')
@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @ApiOperation({
    summary: 'Create rental',
    operationId: 'create_rental',
    description: 'This endpoint is used to create rental',
  })
  @ApiBearerAuth()
  @Post()
  @Role([Roles.TENANT])
  @UseGuards(AccessTokenGuard, RoleGuard)
  create(@Body() createRentalDto: CreateRentalDto) {
    return this.rentalsService.create(createRentalDto);
  }

  @ApiOperation({
    summary: 'Get all rentals as admin',
    operationId: 'get_all_rentals_as_admin',
    description: 'This endpoint is used to get all rentals as admin',
  })
  @ApiBearerAuth()
  @Role([Roles.ADMIN])
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Get('as/admin')
  findAll() {
    return this.rentalsService.findAll();
  }

  @ApiOperation({
    summary: 'Get all rentals as landlord',
    operationId: 'get_all_rentals_as_landlord',
    description: 'This endpoint is used to get all rentals as landlord',
  })
  @ApiBearerAuth()
  @Get('as/landlord')
  @Role([Roles.LANDLORD])
  @UseGuards(AccessTokenGuard, RoleGuard)
  findAllAsLandlord(@UserId() userId: string) {
    return this.rentalsService.findAll({});
  }

  @ApiOperation({
    summary: 'Get all rentals as tenant',
    operationId: 'get_all_rentals_as_tenant',
    description: 'This endpoint is used to get all rentals as tenant',
  })
  @ApiBearerAuth()
  @Get('as/tenant')
  @Role([Roles.TENANT])
  @UseGuards(AccessTokenGuard, RoleGuard)
  findAllAsTenant(@UserId() userId: string) {
    return this.rentalsService.findAll({ tenantId: userId });
  }

  @ApiOperation({
    summary: 'Get rental by id',
    operationId: 'get_rental_by_id',
    description: 'This endpoint is used to get rental by id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rentalsService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update rental',
    operationId: 'update_rental',
    description: 'This endpoint is used to update rental',
  })
  @ApiBearerAuth()
  @Patch(':id')
  @Role([Roles.ADMIN, Roles.LANDLORD])
  @UseGuards(AccessTokenGuard, RoleGuard)
  update(@Param('id') id: string, @Body() updateRentalDto: UpdateRentalDto) {
    return this.rentalsService.update(id, updateRentalDto);
  }

  @ApiOperation({
    summary: 'Delete rental',
    operationId: 'delete_rental',
    description: 'This endpoint is used to delete rental',
  })
  @ApiBearerAuth()
  @Delete(':id')
  @Role([Roles.ADMIN])
  @UseGuards(AccessTokenGuard, RoleGuard)
  remove(@Param('id') id: string) {
    return this.rentalsService.remove(id);
  }
}
