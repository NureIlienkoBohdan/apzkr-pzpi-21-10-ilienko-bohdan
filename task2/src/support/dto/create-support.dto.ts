// src/support/dto/create-support.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateSupportDto {
  @ApiProperty({ description: 'Subject of the support ticket' })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ description: 'Description of the support ticket' })
  @IsString()
  @IsNotEmpty()
  description: string;
}
