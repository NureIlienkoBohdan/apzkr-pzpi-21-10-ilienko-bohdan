import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export class CreateDroneUsageDto {
  @ApiProperty({ description: 'ID пользователя', example: 'user-id' })
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'ID дрона', example: 'drone-id' })
  @IsNotEmpty()
  droneId: string;

  @ApiProperty({ description: 'Тип использования', example: 'subscription' })
  @IsEnum(['subscription', 'one-time rental'])
  usage_type: string;

  @ApiProperty({
    description: 'ID подписки',
    example: 'subscription-id',
    required: false,
  })
  @IsOptional()
  subscriptionId?: string;

  @ApiProperty({
    description: 'ID аренды',
    example: 'rental-id',
    required: false,
  })
  @IsOptional()
  rentalId?: string;

  @ApiProperty({
    description: 'Время начала использования',
    example: '2023-01-01T00:00:00Z',
  })
  @IsNotEmpty()
  start_time: Date;

  @ApiProperty({
    description: 'Время окончания использования',
    example: '2023-01-01T01:00:00Z',
    required: false,
  })
  @IsOptional()
  end_time?: Date;
}
