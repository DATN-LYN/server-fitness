import { Field, ID, InputType } from '@nestjs/graphql';

@InputType({ isAbstract: true })
export class UpsertExerciseInputDto {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field()
  name: string;

  @Field()
  imgUrl: string;

  @Field()
  duration: string;

  @Field()
  videoUrl: string;

  @Field()
  calo: number;

  @Field()
  programId: string;
}
