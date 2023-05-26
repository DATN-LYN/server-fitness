import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@ObjectType({ isAbstract: true })
@Entity('support')
export class Support extends BaseEntity {
  @Column()
  @PrimaryGeneratedColumn()
  @Field()
  id: string;

  @Column({nullable: true })
  @Field({nullable: true })
  userId: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Field()
  @Column({nullable: true })
  content: string; 

  @Field()
  @Column({ nullable: true })
  imgUrl: string; 

  @Field()
  @Column({nullable: true })
  isRead: boolean; 

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