import { Exercise } from '@/db/entities/Exercise';
import { User } from '@/db/entities/User';
import { Field, ID, InputType } from '@nestjs/graphql';
import { ManyToOne } from 'typeorm';

@InputType({ isAbstract: true })
export class UpsertUserExerciseInputDto {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field()
  @ManyToOne(()=>User)
  userId: string;

  @Field()
  @ManyToOne(()=>Exercise)
  exerciseId: string;
}
