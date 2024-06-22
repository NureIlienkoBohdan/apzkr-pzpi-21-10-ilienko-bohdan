import { ApiProperty } from '@nestjs/swagger';

export class CreateDroneModelDto {
  @ApiProperty({ description: 'Name of the drone model', example: 'Phantom 4' })
  name: string;

  @ApiProperty({ description: 'Manufacturer of the drone', example: 'DJI' })
  manufacturer: string;

  @ApiProperty({
    description: 'Weight of the drone in grams',
    example: 1380,
    required: false,
  })
  weight?: number;

  @ApiProperty({
    description: 'Maximum speed of the drone in km/h',
    example: 72,
    required: false,
  })
  max_speed?: number;

  @ApiProperty({
    description: 'Maximum flight time of the drone in minutes',
    example: 30,
    required: false,
  })
  max_flight_time?: number;

  @ApiProperty({
    description: 'Maximum range of the drone in kilometers',
    example: 5,
    required: false,
  })
  max_range?: number;

  @ApiProperty({
    description: 'Price of the drone in USD',
    example: 1499,
    required: false,
  })
  price?: number;

  @ApiProperty({
    description: 'Description of the drone model',
    example:
      'A high-performance drone suitable for aerial photography and videography.',
    required: false,
  })
  description?: string;
}
