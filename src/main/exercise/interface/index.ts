import { BaseMeta } from '@/common/base/queryFilterDto';
import { Exercise } from '@/db/entities/Exercise';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export class IExercise extends Exercise {}

@ObjectType({ isAbstract: true })
export class IExercises extends BaseMeta {
  @Field(() => [Exercise], { nullable: true })
  items: Exercise[];
}
