import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { DroneModel } from './drone-model.entity';
import { DroneOwnerType, DroneStatus, DroneUsagePlan } from 'core';
import { DroneLeaseToCompany } from 'src/leasing/entities/leasing.entity';

@Entity('drones')
export class Drone {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: DroneStatus, default: DroneStatus.AVAILABLE })
  status: DroneStatus;

  @Column({ type: 'enum', enum: DroneOwnerType })
  owner: DroneOwnerType;

  @Column({ type: 'int', default: 100 })
  battery_level: number;

  @Column({ default: 'Warehouse' })
  location: string;

  @Column({ type: 'enum', enum: DroneUsagePlan, nullable: true })
  plan?: DroneUsagePlan;

  @ManyToOne(() => DroneModel, (droneModel) => droneModel.drones)
  droneModel: DroneModel;

  @OneToMany(() => DroneLeaseToCompany, (lease) => lease.drone)
  leases: DroneLeaseToCompany[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
