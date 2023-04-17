import { BaseMeta } from '@/common/base/queryFilterDto';
import { Category } from '@/db/entities/Category';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export class ICategory extends Category {}

@ObjectType({ isAbstract: true })
export class ICategories extends BaseMeta {
  @Field(() => [Category], { nullable: true })
  items: Category[];
}
