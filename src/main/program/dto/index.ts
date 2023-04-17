import { Field, ID, InputType } from '@nestjs/graphql';

@InputType({ isAbstract: true })
export class UpsertProgramInputDto {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field()
  name: string;
}
