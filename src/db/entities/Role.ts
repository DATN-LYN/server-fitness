import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType({ isAbstract: true })
@Entity('role')
export class Role extends BaseEntity {
  @Column()
  @Field()
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @Field()
  name: string;
}
