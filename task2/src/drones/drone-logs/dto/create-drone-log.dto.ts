import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateDroneLogDto {
  @ApiProperty({
    description: 'The ID of the drone',
    example: 'd0f1b2c3-4567-89ab-cdef-0123456789ab',
  })
  @IsString()
  droneId: string;

  @ApiProperty({
    description: 'Timestamp of the log entry',
    example: '2023-06-22T10:20:30Z',
  })
  @IsDate()
  timestamp: Date;

  @ApiProperty({ description: 'Latitude of the drone', example: 37.7749 })
  @IsNumber()
  latitude: number;

  @ApiProperty({ description: 'Longitude of the drone', example: -122.4194 })
  @IsNumber()
  longitude: number;

  @ApiProperty({ description: 'Altitude of the drone', example: 150.5 })
  @IsNumber()
  altitude: number;

  @ApiProperty({ description: 'Battery level of the drone', example: 85 })
  @IsNumber()
  battery_level: number;

  @ApiProperty({
    description: 'Camera feed URL',
    example: 'http://example.com/feed',
  })
  @IsString()
  camera_feed_url: string;
}
