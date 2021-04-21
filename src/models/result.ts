import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { StageContent } from './stagecontent';

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'decimal', nullable: false })
  point!: number;

  @Column({
    name: 'complete_time',
    type: 'timestamp without time zone',
    nullable: false
  })
  completeTime!: Date;

  @ManyToOne(() => StageContent, (stageContent) => stageContent.results, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'stage_content_id' })
  stageContent!: StageContent;
}
