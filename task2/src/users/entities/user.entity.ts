import { Roles } from 'core';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('IDX_EMAIL', { unique: true })
  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Roles,
    array: true,
    default: [Roles.TENANT],
  })
  roles: Roles[];

  @Column({ default: new Date() })
  createdAt: Date;

  @Index('IDX_TOKEN')
  @Column({ nullable: true })
  token?: string;
}
