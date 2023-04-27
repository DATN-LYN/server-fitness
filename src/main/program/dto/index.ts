import { Field, ID, InputType } from '@nestjs/graphql';

@InputType({ isAbstract: true })
export class UpsertProgramInputDto {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field()
  name: string;

  @Field()
  duration: string;

  @Field()
  calo: number;

  @Field()
  level: number;

  @Field()
  bodyPart: string;

  @Field()
  description: string;

  @Field()
  imgUrl: string;

}
