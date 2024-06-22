// src/subscriptions/subscriptions.controller.ts
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
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';
import { Subscription } from './entities/subscription.entity';
import {
  AccessTokenGuard,
  AtLeastOneRoleGuard,
  Role,
  Roles,
  UserId,
} from 'core';

@ApiTags('subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @ApiOperation({ summary: 'Create a subscription' })
  @ApiBearerAuth()
  @Post()
  @UseGuards(AccessTokenGuard)
  @ApiResponse({
    status: 201,
    description: 'The subscription has been successfully created.',
    type: Subscription,
  })
  create(
    @UserId() userId: string,
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ) {
    return this.subscriptionsService.create(userId, createSubscriptionDto);
  }

  @ApiOperation({ summary: 'Get all subscriptions' })
  @ApiBearerAuth()
  @Get()
  @Role([Roles.ADMIN])
  @UseGuards(AccessTokenGuard, AtLeastOneRoleGuard)
  @ApiResponse({
    status: 200,
    description: 'Return all subscriptions',
    type: [Subscription],
  })
  findAll() {
    return this.subscriptionsService.findAll();
  }

  @ApiOperation({ summary: 'Get a subscription by ID' })
  @ApiBearerAuth()
  @Get(':id')
  @Role([Roles.ADMIN])
  @UseGuards(AccessTokenGuard, AtLeastOneRoleGuard)
  @ApiResponse({
    status: 200,
    description: 'Return a subscription by ID',
    type: Subscription,
  })
  findOne(@Param('id') id: string) {
    return this.subscriptionsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a subscription by ID' })
  @ApiBearerAuth()
  @Patch(':id')
  @Role([Roles.ADMIN])
  @UseGuards(AccessTokenGuard, AtLeastOneRoleGuard)
  @ApiResponse({
    status: 200,
    description: 'The subscription has been successfully updated.',
    type: Subscription,
  })
  update(
    @Param('id') id: string,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    return this.subscriptionsService.update(id, updateSubscriptionDto);
  }

  @ApiOperation({ summary: 'Delete a subscription by ID' })
  @ApiBearerAuth()
  @Delete(':id')
  @Role([Roles.ADMIN])
  @UseGuards(AccessTokenGuard, AtLeastOneRoleGuard)
  @ApiResponse({
    status: 200,
    description: 'The subscription has been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return this.subscriptionsService.remove(id);
  }
}
