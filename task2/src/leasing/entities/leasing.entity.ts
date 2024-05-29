import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Drone } from 'src/drones/entities/drone.entity';

enum DroneLeaseStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
}

@Entity('drone_lease_to_company')
export class DroneLeaseToCompany {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User) // Пользователь, который сдает дрон в аренду компании
  user: User;

  @ManyToOne(() => Drone) // Дрон, который сдается в аренду компании
  drone: Drone;

  //   @ManyToOne(() => User) // Компания, которой сдается дрон в аренду
  //   company: User;

  @Column()
  start_time: Date;

  @Column()
  end_time: Date;

  @Column({ nullable: true })
  actual_end_time: Date;

  @Column({
    type: 'enum',
    enum: DroneLeaseStatus,
    default: DroneLeaseStatus.PENDING,
  })
  status: DroneLeaseStatus; // Статус сдачи дрона в аренду компании

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
