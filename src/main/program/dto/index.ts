import { Field, ID, InputType } from '@nestjs/graphql';

@InputType({ isAbstract: true })
export class UpsertProgramInputDto {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field()
  name: string;

  @Field()
  level: number;

  @Field()
  bodyPart: number;

  @Field()
  description: string;

  @Field()
  imgUrl: string;

  @Field()
  categoryId: string;

  @Field()
  view: number;
}
