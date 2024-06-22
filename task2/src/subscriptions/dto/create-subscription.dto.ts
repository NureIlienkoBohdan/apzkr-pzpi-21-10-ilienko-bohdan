// src/subscriptions/dto/create-subscription.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, IsDateString } from 'class-validator';

export class CreateSubscriptionDto {
  @ApiProperty({ description: 'User ID' })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'Type of subscription' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ description: 'Plan of subscription' })
  @IsString()
  @IsNotEmpty()
  plan: string;

  @ApiProperty({ description: 'Start date of subscription' })
  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({ description: 'End date of subscription' })
  @IsDateString()
  @IsNotEmpty()
  endDate: Date;
}
