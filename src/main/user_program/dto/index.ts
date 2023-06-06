import { Program } from '@/db/entities/Program';
import { User } from '@/db/entities/User';
import { Field, ID, InputType } from '@nestjs/graphql';
import { ManyToOne } from 'typeorm';

@InputType({ isAbstract: true })
export class UpsertUserProgramInputDto {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field()
  @ManyToOne(()=>User)
  userId: string;

  @Field()
  @ManyToOne(()=>Program)
  programId: string;

  @Field({ nullable: true})
  isFavorite: boolean;
}
