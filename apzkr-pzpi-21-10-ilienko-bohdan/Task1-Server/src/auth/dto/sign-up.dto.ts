import { IsOptional, IsString } from 'class-validator';
import { SignInDto } from './sign-in.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto extends SignInDto {
  @ApiProperty({ description: 'The name of the user', example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The birth date of the user',
    example: '2000-01-01',
  })
  @IsString()
  birthDate: Date;
}
