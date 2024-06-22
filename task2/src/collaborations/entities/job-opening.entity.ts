import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { CollaborationApplication } from './collaboration-application.entity';

export enum JobOpeningStatus {
  OPEN = 'open',
  CLOSED = 'closed',
  CANCELLED = 'cancelled',
}

export enum SalaryCurrency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  UAH = 'UAH',
}

@Entity('job_openings')
export class JobOpening {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  requirements: string;

  @Column()
  location: string;

  @Column()
  salary: number;

  @Column({
    type: 'enum',
    enum: SalaryCurrency,
    default: SalaryCurrency.USD,
  })
  salaryCurrency: SalaryCurrency;

  @Column({
    type: 'enum',
    enum: JobOpeningStatus,
    default: JobOpeningStatus.OPEN,
  })
  status: JobOpeningStatus;

  @OneToMany(
    () => CollaborationApplication,
    (collaborationApplication) => collaborationApplication.jobOpening,
  )
  collaborationApplications: CollaborationApplication[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
