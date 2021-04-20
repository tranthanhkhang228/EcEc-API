import { Account } from './account';
import {
  Entity,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne
} from 'typeorm';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  subject!: string;

  @Column({
    type: 'varchar',
    length: 1000,
    nullable: false
  })
  content!: string;

  @CreateDateColumn({ name: 'submission_date', type: 'date' })
  submissionDate!: Date;

  @ManyToOne(() => Account, (account) => account.feedbacks, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'account_id' })
  account!: Account;
}
