import { StageContent } from './stagecontent';
import { Realm } from './realm';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable
} from 'typeorm';

@Entity()
export class Stage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int', name: 'stage_order', nullable: false, unique: true })
  stageOrder!: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true
  })
  name!: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  description!: string;

  @OneToMany(() => StageContent, (stageContent) => stageContent.stages, {
    cascade: ['insert', 'update']
  })
  stageContents!: StageContent[];

  @ManyToMany(() => Realm, {
    cascade: ['insert', 'update']
  })
  @JoinTable({
    name: 'stage_of_realm',
    joinColumns: [{ name: 'stage_id', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'realm_id', referencedColumnName: 'id' }]
  })
  realms!: Realm[];
}
