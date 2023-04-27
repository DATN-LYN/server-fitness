import { BaseMeta } from '@/common/base/queryFilterDto';
import { Inbox } from '@/db/entities/Inbox';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export class IInbox extends Inbox {}

@ObjectType({ isAbstract: true })
export class IInboxes extends BaseMeta {
  @Field(() => [Inbox], { nullable: true })
  items: Inbox[];
}
