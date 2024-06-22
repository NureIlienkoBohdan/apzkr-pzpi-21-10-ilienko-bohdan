import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { JobOpening } from './job-opening.entity';

export enum ApplicantType {
  WORKER = 'worker',
  LANDLORD = 'landlord',
}

@Entity('collaboration_applications')
export class CollaborationApplication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  coverLetter: string;

  @Column({
    type: 'enum',
    enum: ApplicantType,
    default: ApplicantType.WORKER,
  })
  applicantType: ApplicantType;

  @ManyToOne(() => User, (user) => user.collaborationApplications)
  user: User;

  @ManyToOne(
    () => JobOpening,
    (jobOpening) => jobOpening.collaborationApplications,
    {
      nullable: true,
    },
  )
  jobOpening?: JobOpening;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
