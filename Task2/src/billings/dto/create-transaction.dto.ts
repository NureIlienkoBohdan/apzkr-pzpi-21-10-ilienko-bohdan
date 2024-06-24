// src/billings/dto/create-transaction.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';
import { TransactionType } from 'core';

export class CreateTransactionDto {
  @ApiProperty({
    type: String,
    description: 'User balance id',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  userBalanceId: string;

  @ApiProperty({
    type: Number,
    description: 'Amount of transaction',
    example: 100.0,
  })
  @IsNumber()
  @Min(0.01)
  amount: number;

  @ApiProperty({
    type: 'enum',
    enum: TransactionType,
    description: 'Transaction type',
    example: TransactionType.RENT_INCOME,
  })
  @IsNotEmpty()
  type: TransactionType;

  @ApiProperty({
    type: String,
    description: 'Transaction description',
    example: 'Rent income',
    required: false,
  })
  description?: string;
}
