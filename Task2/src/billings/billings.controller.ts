// src/billings/billings.controller.ts
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
import { BillingsService } from './billings.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { CreateUserBalanceDto } from './dto/create-user-balance.dto';
import { UpdateUserBalanceDto } from './dto/update-user-balance.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';
import { Transaction } from './entities/transactions.entity';
import { UserBalance } from './entities/user-balances.entity';
import { AccessTokenGuard, Role, RoleGuard, Roles, UserId } from 'core';

@ApiTags('billings')
@Controller('billings')
export class BillingsController {
  constructor(private readonly billingsService: BillingsService) {}

  @ApiOperation({ summary: 'Create a transaction' })
  @ApiBearerAuth()
  @Post('transactions')
  // @Role([Roles.TENANT, Roles.LANDLORD, Roles.ADMIN, Roles.WORKER])
  @UseGuards(AccessTokenGuard)
  @ApiResponse({
    status: 201,
    description: 'The transaction has been successfully created.',
    type: Transaction,
  })
  createTransaction(
    @Body() createTransactionDto: CreateTransactionDto,
    @UserId() userId: string,
  ) {
    return this.billingsService.createTransaction(createTransactionDto, userId);
  }

  @ApiOperation({ summary: 'Create a transaction for any user by admin' })
  @ApiBearerAuth()
  @Post('transactions/admin')
  @Role([Roles.ADMIN])
  @UseGuards(AccessTokenGuard, RoleGuard)
  @ApiResponse({
    status: 201,
    description: 'The transaction has been successfully created.',
    type: Transaction,
  })
  createTransactionForAdmin(
    @UserId() userId: string,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.billingsService.createTransaction(createTransactionDto, userId);
  }

  @ApiOperation({ summary: 'Get all transactions' })
  @ApiBearerAuth()
  @Get('transactions')
  @Role([Roles.ADMIN])
  @UseGuards(AccessTokenGuard, RoleGuard)
  @ApiResponse({
    status: 200,
    description: 'Return all transactions',
    type: [Transaction],
  })
  findAllTransactions() {
    return this.billingsService.findAllTransactions();
  }

  @ApiOperation({ summary: 'Get a transaction by ID' })
  @ApiBearerAuth()
  @Get('transactions/:id')
  @Role([Roles.ADMIN])
  @UseGuards(AccessTokenGuard, RoleGuard)
  @ApiResponse({
    status: 200,
    description: 'Return a transaction by ID',
    type: Transaction,
  })
  findOneTransaction(@Param('id') id: string) {
    return this.billingsService.findOneTransaction(id);
  }

  @ApiOperation({ summary: 'Update a transaction by ID' })
  @ApiBearerAuth()
  @Patch('transactions/:id')
  @Role([Roles.ADMIN])
  @UseGuards(AccessTokenGuard, RoleGuard)
  @ApiResponse({
    status: 200,
    description: 'The transaction has been successfully updated.',
    type: Transaction,
  })
  updateTransaction(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.billingsService.updateTransaction(id, updateTransactionDto);
  }

  @ApiOperation({ summary: 'Delete a transaction by ID' })
  @ApiBearerAuth()
  @Delete('transactions/:id')
  @Role([Roles.ADMIN])
  @UseGuards(AccessTokenGuard, RoleGuard)
  @ApiResponse({
    status: 200,
    description: 'The transaction has been successfully deleted.',
  })
  removeTransaction(@Param('id') id: string) {
    return this.billingsService.removeTransaction(id);
  }

  @ApiOperation({ summary: 'Create a user balance' })
  @ApiBearerAuth()
  @Post('balances')
  @Role([Roles.ADMIN])
  @UseGuards(AccessTokenGuard, RoleGuard)
  @ApiResponse({
    status: 201,
    description: 'The user balance has been successfully created.',
    type: UserBalance,
  })
  createUserBalance(
    @UserId() userId: string,
    @Body() createUserBalanceDto: CreateUserBalanceDto,
  ) {
    return this.billingsService.createUserBalance(userId, createUserBalanceDto);
  }

  @ApiOperation({ summary: 'Get all user balances' })
  @ApiBearerAuth()
  @Get('balances')
  @Role([Roles.ADMIN])
  @UseGuards(AccessTokenGuard, RoleGuard)
  @ApiResponse({
    status: 200,
    description: 'Return all user balances',
    type: [UserBalance],
  })
  findAllUserBalances() {
    return this.billingsService.findAllUserBalances();
  }

  @ApiOperation({ summary: 'Get a user balance by ID' })
  @ApiBearerAuth()
  @Get('balances/:id')
  @Role([Roles.ADMIN])
  @UseGuards(AccessTokenGuard, RoleGuard)
  @ApiResponse({
    status: 200,
    description: 'Return a user balance by ID',
    type: UserBalance,
  })
  findOneUserBalance(@Param('id') id: string) {
    return this.billingsService.findOneUserBalance(id);
  }

  @ApiOperation({ summary: 'Update a user balance by ID' })
  @ApiBearerAuth()
  @Patch('balances/:id')
  @Role([Roles.ADMIN])
  @UseGuards(AccessTokenGuard, RoleGuard)
  @ApiResponse({
    status: 200,
    description: 'The user balance has been successfully updated.',
    type: UserBalance,
  })
  updateUserBalance(
    @Param('id') id: string,
    @Body() updateUserBalanceDto: UpdateUserBalanceDto,
  ) {
    return this.billingsService.updateUserBalance(id, updateUserBalanceDto);
  }

  @ApiOperation({ summary: 'Delete a user balance by ID' })
  @ApiBearerAuth()
  @Delete('balances/:id')
  @Role([Roles.ADMIN])
  @UseGuards(AccessTokenGuard, RoleGuard)
  @ApiResponse({
    status: 200,
    description: 'The user balance has been successfully deleted.',
  })
  removeUserBalance(@Param('id') id: string) {
    return this.billingsService.removeUserBalance(id);
  }
}
