import { BODY_PART, WORKOUT_LEVEL } from '@/common/constant';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
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

registerEnumType(WORKOUT_LEVEL, {
  name: "WORKOUT_LEVEL",
})

registerEnumType(BODY_PART, {
  name: "BODY_PART",
})
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
  view: number;

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

  @Field(() => WORKOUT_LEVEL, { nullable: true })
  @Column({ type: 'enum', enum: WORKOUT_LEVEL})
  level: WORKOUT_LEVEL

  @Field(() => BODY_PART, { nullable: true })
  @Column({ type: 'enum', enum: BODY_PART})
  bodyPart: BODY_PART
}
