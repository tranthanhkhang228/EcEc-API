import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';

import { GameType } from './gametype';
import { StageContent } from './stagecontent';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name!: string;

  @Column({ type: 'varchar', length: 300, nullable: false, unique: true })
  introduction!: string;

  @Column({ type: 'varchar', length: 300, nullable: false, unique: true })
  uses!: string;

  @ManyToOne(() => GameType, (gametype) => gametype.games, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'type_id' })
  gameType!: GameType;

  @OneToMany(() => StageContent, (stageContent) => stageContent.games, {
    cascade: ['insert', 'update']
  })
  stageContents!: StageContent[];
}
