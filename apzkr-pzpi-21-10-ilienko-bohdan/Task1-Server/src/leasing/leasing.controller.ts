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
import { LeasingService } from './leasing.service';
import { CreateLeasingDto } from './dto/create-leasing.dto';
import { UpdateLeasingDto } from './dto/update-leasing.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard, Role, RoleGuard, Roles, UserId } from 'core';

@ApiTags('leasing')
@Controller('leasing')
export class LeasingController {
  constructor(private readonly leasingService: LeasingService) {}

  @Get()
  findAll() {
    return this.leasingService.findAll();
  }

  @ApiOperation({
    summary: 'Create leasing',
    operationId: 'create_leasing',
    description: 'This endpoint is used to create leasing',
  })
  @Post()
  @Role([Roles.LANDLORD])
  @UseGuards(AccessTokenGuard, RoleGuard)
  create(@UserId() userId, @Body() createLeasingDto: CreateLeasingDto) {
    return this.leasingService.create(userId, createLeasingDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leasingService.findOne(+id);
  }

  @Patch(':id')
  @Role([Roles.LANDLORD])
  @UseGuards(AccessTokenGuard, RoleGuard)
  update(
    @Param('id') id: string,
    @UserId() userId,
    @Body() updateLeasingDto: UpdateLeasingDto,
  ) {
    // return this.leasingService.update(id, userId, updateLeasingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leasingService.remove(id);
  }
}
