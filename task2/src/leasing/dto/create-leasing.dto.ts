import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';

export class CreateLeasingDto {
  @ApiProperty({
    description: 'This is id of the drone',
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
  drone: { id: string };

  @ApiProperty({
    description: 'This is the start date of the leasing',
    example: '2021-08-01T00:00:00.000Z',
    required: true,
    type: Date,
  })
  @IsNotEmpty()
  @IsDate()
  start_time: Date;

  @ApiProperty({
    description: 'This is the end date of the leasing',
    example: '2021-08-31T23:59:59.000Z',
    required: true,
    type: Date,
  })
  @IsNotEmpty()
  @IsDate()
  end_time: Date;
}
