import { Field, ID, InputType } from '@nestjs/graphql';

@InputType({ isAbstract: true })
export class UpsertSupportInputDto {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field()
  email: string;

  @Field()
  description: string;

  @Field()
  imgUrl: string;

}
