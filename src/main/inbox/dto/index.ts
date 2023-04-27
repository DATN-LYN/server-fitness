import { User } from '@/db/entities/User';
import { Field, ID, InputType } from '@nestjs/graphql';
import { ManyToOne } from 'typeorm';

@InputType({ isAbstract: true })
export class UpsertInboxInputDto {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field()
  message: string;

  @Field()
  @ManyToOne(()=>User)
  userId: string;

  @Field()
  isSender: boolean;
}
