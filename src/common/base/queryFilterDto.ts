import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export class Meta {
  @Field({ nullable: true })
  totalItems: number;

  @Field({ nullable: true })
  itemCount: number;

  @Field({ nullable: true })
  itemsPerPage: number;

  @Field({ nullable: true })
  totalPages: number;

  @Field({ nullable: true })
  currentPage: number;
}

@ObjectType({ isAbstract: true })
export class BaseMeta {
  @Field({ nullable: true })
  meta: Meta;
}
