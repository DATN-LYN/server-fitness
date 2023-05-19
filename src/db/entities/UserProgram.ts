import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { User } from './User';
import { Program } from './Program';

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

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Field(() => Program, { nullable: true })
  @ManyToOne(() => Program)
  @JoinColumn({ name: 'program_id' })
  program: Program;
  
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
