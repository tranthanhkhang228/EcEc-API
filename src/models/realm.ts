import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Realm {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int', name: 'realm_order', nullable: false, unique: true })
  realmOrder!: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true
  })
  name!: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  description!: string;
}
