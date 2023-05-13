import { User } from '@/db/entities/User';
import { Field, ID, InputType } from '@nestjs/graphql';
import { ManyToOne } from 'typeorm';

@InputType({ isAbstract: true })
export class UpsertUserStatisticsInputDto {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field()
  @ManyToOne(()=>User)
  userId: string;

  @Field()
  programCount: number;

  @Field()
  caloCount: number;

  @Field()
  durationCount: number;
}
