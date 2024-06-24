import { ApiProperty } from '@nestjs/swagger';
import { SalaryCurrency } from '../entities/job-opening.entity';

export class CreateJobOpeningDto {
  @ApiProperty({
    description: 'The title of the job opening',
    example: 'Software Engineer',
  })
  title: string;

  @ApiProperty({
    description: 'The description of the job opening',
    example: 'We are looking for a software engineer.',
  })
  description: string;

  @ApiProperty({
    description: 'The requirements of the job opening',
    example: 'Experience with Node.js, React.js, and TypeScript.',
  })
  requirements: string;

  @ApiProperty({
    description: 'The location of the job opening',
    example: 'Berlin',
  })
  location: string;

  @ApiProperty({ description: 'The salary of the job opening', example: 4000 })
  salary: number;

  @ApiProperty({
    description: 'The currency of the salary',
    example: SalaryCurrency.USD,
  })
  salaryCurrency: SalaryCurrency;
}
