import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Drone } from './drone.entity';

@Entity('drone_logs')
export class DroneLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Drone)
  drone: Drone;

  //   @ManyToOne(() => Rental)
  //   rental: Rental;

  @Column()
  timestamp: Date;

  @Column('float')
  latitude: number;

  @Column('float')
  longitude: number;

  @Column('float')
  altitude: number;

  @Column('int')
  battery_level: number;

  @Column()
  camera_feed_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
