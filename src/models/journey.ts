import { Account } from './account';
import {
  Entity,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { Result } from './result';

@Entity()
export class Journey {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({ name: 'start_date', type: 'date' })
  startDate!: Date;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate!: Date;

  @OneToOne(() => Account, { cascade: true })
  @JoinColumn({ name: 'account_id' })
  account!: Account;

  @ManyToMany(() => Result, { cascade: true })
  @JoinTable({
    name: 'journey_result',
    joinColumns: [{ name: 'result_id', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'journey_id', referencedColumnName: 'id' }]
  })
  results!: Result[];
}
