import { BaseMeta } from '@/common/base/queryFilterDto';
import { Support } from '@/db/entities/Support';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export class ISupport extends Support {}

@ObjectType({ isAbstract: true })
export class ISupports extends BaseMeta {
  @Field(() => [Support], { nullable: true })
  items: Support[];
}
