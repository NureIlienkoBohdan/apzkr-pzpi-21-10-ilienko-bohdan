import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Drone } from './drone.entity';

@Entity('drones_models')
export class DroneModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  manufacturer: string;

  @Column({ nullable: true })
  weight?: number;

  @Column({ nullable: true })
  max_speed?: number;

  @Column({ nullable: true })
  max_flight_time?: number;

  @Column({ nullable: true })
  max_range?: number;

  @Column({ nullable: true })
  price?: number;

  @Column({ nullable: true })
  image_url?: string;

  @Column()
  description?: string;

  @OneToMany(() => Drone, (drone) => drone.droneModel)
  drones: Drone[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
