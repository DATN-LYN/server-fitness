// import { BaseMeta } from '@/common/base/queryFilterDto';
import { BaseMeta } from '@/common/base/queryFilterDto';
import { UserStatistics } from '@/db/entities/UserStatistics';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export class IUserStatistics extends UserStatistics {}

@ObjectType({ isAbstract: true })
export class IUserStatisticses extends BaseMeta {
  @Field(() => [UserStatistics], { nullable: true })
  items: UserStatistics[];
}
