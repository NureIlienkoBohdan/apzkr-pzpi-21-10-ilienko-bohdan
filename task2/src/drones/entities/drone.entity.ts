import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum DroneStatus {
  AVAILABLE = 'available',
  RENTED = 'rented',
  MAINTENANCE = 'maintenance',
}

export enum DroneOwner {
  COMPANY = 'company',
  THIRD_PARTY = 'third_party',
}

@Entity('drones')
export class Drone {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  model: string;

  @Column({ type: 'enum', enum: DroneStatus })
  status: DroneStatus;

  @Column({ type: 'enum', enum: DroneOwner })
  owner: DroneOwner;

  @Column({ type: 'int' })
  battery_level: number;

  @Column()
  location: string;

  @Column()
  plan: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
