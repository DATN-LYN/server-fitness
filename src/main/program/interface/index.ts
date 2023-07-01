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

@ObjectType({ isAbstract: true })
export class ISummary {
  @Field({ nullable: true, defaultValue: 0 })
  userCnt: number;
  
  @Field({ nullable: true, defaultValue: 0 })
  programCnt: number;
  
  @Field({ nullable: true, defaultValue: 0 })
  exerciseCnt: number;
  
  @Field({ nullable: true, defaultValue: 0 })
  categoryCnt: number;
}
