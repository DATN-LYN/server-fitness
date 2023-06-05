import { SUPPORT_STATUS } from '@/common/constant';
import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';

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

  @Field({ nullable: true })
  isRead: boolean;

  @Field(() => SUPPORT_STATUS, { nullable: true })
  @IsEnum(SUPPORT_STATUS, { message: 'SUPPORT_STATUS'})
  status: SUPPORT_STATUS

}
