import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Drone } from './drone.entity';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';
import { Rental } from 'src/rentals/entities/rental.entity';

@Entity('drone_usage')
export class DroneUsage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Drone)
  drone: Drone;

  @Column({ type: 'enum', enum: ['subscription', 'one-time rental'] })
  usage_type: string;

  @ManyToOne(() => Subscription, { nullable: true })
  subscription: Subscription;

  @ManyToOne(() => Rental, { nullable: true })
  rental: Rental;

  @Column()
  start_time: Date;

  @Column({ nullable: true })
  end_time: Date;

  @Column({ nullable: true })
  actual_end_time: Date;

  @Column()
  status: string;

  @Column({ nullable: true })
  condition: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
