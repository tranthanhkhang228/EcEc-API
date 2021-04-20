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
export class Registration {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 1000, nullable: false })
  qualification!: string;

  @Column({
    type: 'varchar',
    name: 'cover_letter',
    length: 1000,
    nullable: false
  })
  coverLetter!: string;

  @Column({ type: 'varchar', length: 1000, nullable: false })
  introduction!: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  level!: string;

  @CreateDateColumn({ name: 'submission_date', type: 'date' })
  submissionDate!: Date;

  @ManyToOne(() => Account, (account) => account.registrations, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'account_id' })
  account!: Account;
}
