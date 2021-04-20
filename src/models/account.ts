import { ApprovalHistory } from './approvalhistory';
import { Feedback } from './feedback';
import { Registration } from './registration';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany
} from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50, type: 'varchar', nullable: false, unique: true })
  email!: string;

  @CreateDateColumn({ name: 'created_at', type: 'date' })
  createdAt!: Date;

  @OneToMany(() => Registration, (registration) => registration.account, {
    cascade: ['insert', 'update']
  })
  registrations!: Registration[];

  @OneToMany(() => Feedback, (feedback) => feedback.account, {
    cascade: ['insert', 'update']
  })
  feedbacks!: Registration[];

  @OneToMany(
    () => ApprovalHistory,
    (approvalHistory) => approvalHistory.account,
    {
      cascade: ['insert', 'update']
    }
  )
  approvalHistories!: ApprovalHistory[];
}
