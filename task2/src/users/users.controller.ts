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
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard, Role, RoleGuard, Roles, User, UserId } from 'core';

//TODO: add api operation (description)
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  findUserAccountData(@UserId() userId) {
    return this.usersService.findOneByParams({ id: userId });
  }

  //TODO: реализовать логику с защитой
  @Get()
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  @ApiBearerAuth()
  @Role([Roles.ADMIN])
  @UseGuards(AccessTokenGuard, RoleGuard)
  createUserAsAdmin() {}

  @Post('create-account/landlord')
  @ApiBearerAuth()
  @Role([Roles.ADMIN])
  @UseGuards(AccessTokenGuard, RoleGuard)
  createLandlordAccount(@UserId() userId: string) {
    return this.usersService.createAnotherRole(userId, Roles.LANDLORD);
  }

  @Post('create-account/worker')
  @ApiBearerAuth()
  @Role([Roles.ADMIN])
  @UseGuards(AccessTokenGuard, RoleGuard)
  createWorkerAccount(@UserId() userId: string) {
    return this.usersService.createAnotherRole(userId, Roles.WORKER);
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneByParams({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
