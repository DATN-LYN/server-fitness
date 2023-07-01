// import { BaseMeta } from '@/common/base/queryFilterDto';
import { BaseMeta } from '@/common/base/queryFilterDto';
import { User } from '@/db/entities/User';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export class IUser extends User {}

@ObjectType({ isAbstract: true })
export class IUsers extends BaseMeta {
  @Field(() => [User], { nullable: true })
  items: User[];
}
