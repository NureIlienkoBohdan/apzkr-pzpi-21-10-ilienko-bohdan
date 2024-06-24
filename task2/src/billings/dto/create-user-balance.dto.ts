// src/billings/dto/create-user-balance.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserBalanceDto {
  // @ApiProperty({ description: 'ID користувача, для якого створюється баланс' })
  // userId: string;

  @ApiProperty({ description: 'Початковий баланс', default: 0 })
  initialBalance?: number = 0;
}
