// src/maintenances/dto/create-maintenance.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsDateString, IsString } from 'class-validator';

export class CreateMaintenanceDto {
  @ApiProperty({ description: 'Drone ID' })
  @IsUUID()
  @IsNotEmpty()
  droneId: string;

  @ApiProperty({ description: 'Description of the maintenance' })
  @IsString()
  @IsNotEmpty()
  description: string;

  //   @ApiProperty({
  //     description: 'User ID of the person performing the maintenance',
  //   })
  //   @IsUUID()
  //   @IsNotEmpty()
  //   performedById: string;

  @ApiProperty({ description: 'Date of the maintenance' })
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({ description: 'Status of the maintenance' })
  @IsString()
  @IsNotEmpty()
  status: string;
}
