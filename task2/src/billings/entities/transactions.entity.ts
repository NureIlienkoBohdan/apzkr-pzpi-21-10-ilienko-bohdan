import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { UserBalance } from './user-balances.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserBalance, (balance) => balance.transactions)
  userBalance: UserBalance;

  @Column({ type: 'float' })
  amount: number;

  @Column()
  type: string; // Тип транзакції (поповнення, оплата оренди, дохід від оренди і т.д.)

  @Column()
  description: string; // Опис транзакції

  @CreateDateColumn()
  created_at: Date;
}
