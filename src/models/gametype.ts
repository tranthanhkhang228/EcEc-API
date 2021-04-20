import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Game } from './game';
import { Tip } from './tip';

@Entity()
export class GameType {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name!: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  description!: string;

  @OneToMany(() => Game, (game) => game.gameType, {
    cascade: ['insert', 'update']
  })
  games!: Game[];

  @OneToMany(() => Tip, (tip) => tip.gameType, {
    cascade: ['insert', 'update']
  })
  tips!: Tip[];
}
