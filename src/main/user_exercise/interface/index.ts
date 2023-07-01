// import { BaseMeta } from '@/common/base/queryFilterDto';
import { BaseMeta } from '@/common/base/queryFilterDto';
import { UserExercise } from '@/db/entities/UserExercise';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export class IUserExercise extends UserExercise {}

@ObjectType({ isAbstract: true })
export class IUserExercises extends BaseMeta {
  @Field(() => [UserExercise], { nullable: true })
  items: UserExercise[];
}
