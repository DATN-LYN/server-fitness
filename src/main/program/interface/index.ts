// import { BaseMeta } from '@/common/base/queryFilterDto';
import { BaseMeta } from '@/common/base/queryFilterDto';
import { Program } from '@/db/entities/Program';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export class IProgram extends Program {}

@ObjectType({ isAbstract: true })
export class IPrograms extends BaseMeta {
  @Field(() => [Program], { nullable: true })
  items: Program[];
}
