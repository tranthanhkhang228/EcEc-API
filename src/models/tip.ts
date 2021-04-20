import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';

import { GameType } from './gametype';

@Entity()
export class Tip {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 300, nullable: false, unique: true })
  content!: string;

  @ManyToOne(() => GameType, (gametype) => gametype.tips, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'type_id' })
  gameType!: GameType;
}
