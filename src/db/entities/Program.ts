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
import { Category } from './Category';

@ObjectType({ isAbstract: true })
@Entity('program')
export class Program extends BaseEntity {
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
  calo: number;

  @Field({ nullable: true })
  @Column()
  level: number;

  @Field({ nullable: true })
  @Column()
  view: number;

  @Field({ nullable: true })
  @Column()
  bodyPart: number;

  @Field({ nullable: true })
  @Column()
  description: string;

  @Field({ nullable: true })
  @Column()
  imgUrl: string;

  @Field()
  @Column()
  categoryId!: string;

  @Field(() => Category, { nullable: true })
  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

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
