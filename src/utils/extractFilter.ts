import { FILTER_OPERATOR } from '@/common/constant';
import { QueryFilterDto } from '@/common/dto';
import { SelectQueryBuilder } from 'typeorm';

export function extractFilter<T>(
  queryBuilder: SelectQueryBuilder<T>,
  queryParams: QueryFilterDto,
  ...fields: string[]
) {
  if (!queryParams.filters) return fields.map(() => null);
  const filterParams = [];
  const queryParamsClone = { ...queryParams };
  queryParamsClone.filters.map((filter) => {
    const index = fields.findIndex((c) => c === filter.field);

    if (index != -1) {
      if (filter.operator === FILTER_OPERATOR.like) {
        queryBuilder.andWhere(`${filter.field} ilike :operatorName`, {
          operatorName: `%${filter.data}%`,
        });
      }
      if (filter.operator === FILTER_OPERATOR.eq) {
        queryBuilder.andWhere(`${filter.field} = :operatorEq`, {
          operatorEq: filter.data,
        });
      }

      filterParams.push(filter.data);
    }
  });
  return filterParams;
}
