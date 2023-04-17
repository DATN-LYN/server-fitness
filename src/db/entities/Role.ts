import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('role')
export class Role extends BaseEntity {
  @Column()
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;
}
