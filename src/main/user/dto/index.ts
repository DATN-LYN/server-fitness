import { GENDER } from '@/common/constant';
import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';

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

  @Field(() => GENDER, { nullable: true })
  @IsEnum(GENDER, { message: 'as'})
  gender: GENDER
}
