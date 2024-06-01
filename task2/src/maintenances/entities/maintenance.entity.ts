import { Drone } from 'src/drones/entities/drone.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('maintenance_records')
export class MaintenanceRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Drone)
  drone: Drone;

  @Column('text')
  description: string;

  @ManyToOne(() => User)
  performed_by: User;

  @Column()
  date: Date;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
