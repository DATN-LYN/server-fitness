import { Field, ID, InputType } from '@nestjs/graphql';

@InputType({ isAbstract: true })
export class UpsertSupportInputDto {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field({ nullable: true })
  userId: string;

  @Field({ nullable: true })
  content: string;

  @Field({ nullable: true })
  imgUrl: string;

}
