import { Stage } from './stage';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { Game } from './game';
import { Result } from './result';

@Entity()
export class StageContent {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Stage, (stage) => stage.stageContents, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'stage_id' })
  stages!: Stage;

  @ManyToOne(() => Game, (game) => game.stageContents, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'game_id' })
  games!: Game;

  @OneToMany(() => Result, (result) => result.stageContent, {
    cascade: ['insert', 'update']
  })
  results!: Result[];
}
