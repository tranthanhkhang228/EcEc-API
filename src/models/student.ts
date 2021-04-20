import { Account } from './account';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Student {
  @Column({ type: 'varchar', name: 'first_name', length: 50, nullable: false })
  firstName!: string;

  @Column({ type: 'varchar', name: 'last_name', length: 50, nullable: false })
  lastName!: string;

  @Column({ type: 'varchar', name: 'phone_number', length: 50, nullable: true })
  phoneNumber!: string;

  @Column({ type: 'date', nullable: true })
  birthday!: Date;

  @Column({ type: 'varchar', length: 300, nullable: true })
  introduction!: string;

  @OneToOne(() => Account, {
    primary: true,
    cascade: true
  })
  @JoinColumn({ name: 'account_id' })
  account!: Account;
}
