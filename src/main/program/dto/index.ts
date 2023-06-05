import { BODY_PART, WORKOUT_LEVEL } from '@/common/constant';
import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';

@InputType({ isAbstract: true })
export class UpsertProgramInputDto {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field()
  name: string;
 
  @Field(() => WORKOUT_LEVEL, { nullable: true })
  @IsEnum(WORKOUT_LEVEL, { message: 'WORKOUT_LEVEL'})
  level: WORKOUT_LEVEL

  @Field(() => BODY_PART, { nullable: true })
  @IsEnum(BODY_PART, { message: 'BODY_PART'})
  bodyPart: BODY_PART

  @Field()
  description: string;

  @Field()
  imgUrl: string;

  @Field()
  categoryId: string;

  @Field()
  view: number;
}
