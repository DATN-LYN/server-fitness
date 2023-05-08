import { Field, ID, InputType } from '@nestjs/graphql';

@InputType({ isAbstract: true })
export class UpsertUserInputDto {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field()
  fullName: string;

  @Field()
  avatar: string;

  @Field()
  email: string;

  @Field()
  age: number;
}
