import { Entity, PrimaryGeneratedColumn } from 'typeorm';

Entity('drones_models');
export class DroneModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
