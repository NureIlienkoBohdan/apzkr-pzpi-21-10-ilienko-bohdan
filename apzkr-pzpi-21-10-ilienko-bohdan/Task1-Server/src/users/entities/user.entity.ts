import { Roles } from 'core';
import { CollaborationApplication } from 'src/collaborations/entities/collaboration-application.entity';
import { DroneLeaseToCompany } from 'src/leasing/entities/leasing.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('IDX_EMAIL', { unique: true })
  @Column({ unique: true })
  email: string;

  @Index('IDX_NAME')
  @Column()
  name: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Roles,
    array: true,
    default: [Roles.TENANT],
  })
  roles: Roles[];

  @Column()
  birthDate: Date;

  @OneToMany(
    () => CollaborationApplication,
    (collaborationApplication) => collaborationApplication.user,
    {
      onDelete: 'CASCADE',
    },
  )
  collaborationApplications: CollaborationApplication[];

  @OneToMany(
    () => DroneLeaseToCompany,
    (droneLeaseToCompany) => droneLeaseToCompany.landlord,
    {
      onDelete: 'CASCADE',
    },
  )
  droneLeasesToCompany: DroneLeaseToCompany[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Index('IDX_TOKEN')
  @Column({ nullable: true })
  token?: string;
}
