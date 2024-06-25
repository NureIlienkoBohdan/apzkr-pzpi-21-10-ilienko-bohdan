import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { DroneUsagePlan } from 'core';

export class CreateDroneDto {
  @ApiProperty({
    description: 'This is id of the drone model',
    example: 'e0bf9274-f022-4d75-93b7-5de168b606e7',
    required: true,
    type: String,
  })
  @Transform(({ value }) => {
    return {
      id: value,
    };
  })
  @IsNotEmpty()
  droneModel: { id: string };

  @ApiProperty({
    description: 'This is drone usage plan',
    example: DroneUsagePlan.BASIC,
    required: true,
    enum: DroneUsagePlan,
  })
  @IsNotEmpty()
  @IsEnum(DroneUsagePlan)
  plan: DroneUsagePlan;
}
