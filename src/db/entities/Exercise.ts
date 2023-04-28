import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Program } from './Program';

@ObjectType({ isAbstract: true })
@Entity('exercise')
export class Exercise extends BaseEntity {
  @Field(() => ID, { nullable: true })
  @PrimaryGeneratedColumn()
  id!: string;

  @Field({ nullable: true })
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column()
  duration: number;

  @Field({ nullable: true })
  @Column()
  videoUrl: string;

  @Field({ nullable: true })
  @Column()
  imgUrl: string;

  @Field({ nullable: true })
  @Column()
  set: number;

  @Field({ nullable: true })
  @Column()
  calo: number;

  @Field()
  @Column()
  programId!: string;

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
