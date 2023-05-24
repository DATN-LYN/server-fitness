import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  @Field()
  @Column({nullable: true })
  email: string; 

  @Field()
  @Column({nullable: true })
  description: string; 

  @Field()
  @Column({ nullable: true })
  imgUrl: string; 

  @Field()
  @Column({nullable: true })
  isRead: boolean; 
}