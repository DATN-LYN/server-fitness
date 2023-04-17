import { Field, ID, InputType } from '@nestjs/graphql';

@InputType({ isAbstract: true })
export class UpsertCategoryInputDto {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field()
  name: string;
}
