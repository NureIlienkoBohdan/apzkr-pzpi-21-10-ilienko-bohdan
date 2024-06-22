import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, Length } from 'class-validator';
import { Roles } from 'core';

export class CreateUserDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'example@example.com',
  })
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  readonly email: string;

  @ApiProperty({ description: 'The password of the user', example: 'password' })
  @IsString()
  @Length(6, 20)
  readonly password: string;

  @ApiProperty({ description: 'The name of the user', example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The birth date of the user',
    example: '2000-01-01',
  })
  @IsString()
  birthDate: Date;

  @ApiProperty({
    example: [Roles.TENANT],
    description: 'The array of the user roles',
  })
  roles: Roles[];
}
