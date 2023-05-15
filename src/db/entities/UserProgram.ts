import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm';

@ObjectType({ isAbstract: true })
@Entity('user_program')
export class UserProgram extends BaseEntity {
  @Field(() => ID, { nullable: true })
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column()
  userId!: string;

  @Field()
  @Column()
  programId!: string;
  
  @Field({ nullable: true })
  @Column()
  createdAt: Date;

  @Field({ nullable: true })
  @Column()
  updatedAt: Date;

  @BeforeInsert()
  updateTimestampBeforeInsert() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  updateTimestampBeforeUpdate() {
    this.updatedAt = new Date();
  }
}
