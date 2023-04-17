import {
  Field,
  ObjectType,
  InputType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { FILTER_OPERATOR } from '../constant';

@ObjectType({ isAbstract: true })
export class ResponseMessageBase {
  @Field()
  message: string;

  @Field()
  success: boolean;
}

registerEnumType(FILTER_OPERATOR, {
  name: 'FILTER_OPERATOR',
});

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class FilterDto {
  @Field({ nullable: true })
  field: string;

  @Field({ nullable: true })
  data: string;

  @Field(() => FILTER_OPERATOR, { nullable: true })
  @IsEnum(FILTER_OPERATOR, {
    message: `Filter Operator must be in types: [${Object.values(
      FILTER_OPERATOR,
    )}]`,
  })
  operator: string;
}

@InputType({ isAbstract: true })
@ObjectType({ isAbstract: true })
export class QueryFilterDto {
  @Field({ nullable: true })
  limit: number;

  @Field({ nullable: true })
  page: number;

  @Field({ nullable: true })
  orderBy: string;

  @Field(() => [FilterDto], { nullable: true })
  filters: FilterDto[];
}
