import { Account } from './account';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Companion {
  @Column({ type: 'int', nullable: true })
  call!: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false
  })
  level!: string;

  @OneToOne(() => Account, {
    primary: true,
    cascade: true
  })
  @JoinColumn({ name: 'account_id' })
  account!: Account;
}
