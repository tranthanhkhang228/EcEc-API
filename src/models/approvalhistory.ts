import { Registration } from './registration';
import { Account } from './account';
import {
  Entity,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToOne
} from 'typeorm';

@Entity()
export class ApprovalHistory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 300, nullable: true })
  reason!: string;

  @Column({
    type: 'bit',
    nullable: false
  })
  status!: number;

  @CreateDateColumn({ name: 'approval_date', type: 'date' })
  approvalDate!: Date;

  @OneToOne(() => Registration, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'registration_id' })
  registration!: Registration;

  @ManyToOne(() => Account, (account) => account.registrations, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'account_id' })
  account!: Account;
}
