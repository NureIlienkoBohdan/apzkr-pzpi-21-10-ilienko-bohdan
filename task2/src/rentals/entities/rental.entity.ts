import { Drone } from 'src/drones/entities/drone.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

// import { Subscription } from './subscription.entity';

@Entity('rentals')
export class Rental {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User) // Орендатор (користувач)
  renter: User;

  @ManyToOne(() => Drone) // Дрон, який взятий в оренду
  drone: Drone;

  //   @ManyToOne(() => Subscription, { nullable: true }) // Підписка, через яку здійснено оренду
  //   subscription: Subscription;

  @Column()
  start_time: Date; // Час початку оренди

  @Column()
  end_time: Date; // Час завершення оренди

  @Column({ nullable: true })
  actual_end_time: Date; // Фактичний час завершення оренди (якщо оренда вже завершилась)

  @Column()
  status: string; // Статус оренди (наприклад, "активна", "завершена")

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;
}
