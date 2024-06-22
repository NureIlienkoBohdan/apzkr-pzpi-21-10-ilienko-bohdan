// src/billings/dto/update-user-balance.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateUserBalanceDto } from './create-user-balance.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserBalanceDto extends PartialType(CreateUserBalanceDto) {
  @ApiProperty({ description: 'Зміна балансу', required: false })
  balanceChange?: number;
}
