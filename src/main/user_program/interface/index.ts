// import { BaseMeta } from '@/common/base/queryFilterDto';
import { BaseMeta } from '@/common/base/queryFilterDto';
import { UserProgram } from '@/db/entities/UserProgram';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export class IUserProgram extends UserProgram {}

@ObjectType({ isAbstract: true })
export class IUserPrograms extends BaseMeta {
  @Field(() => [UserProgram], { nullable: true })
  items: UserProgram[];
}
