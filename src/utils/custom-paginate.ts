import { SelectQueryBuilder } from 'typeorm';

export async function customPaginate<T>(
  queryBuilder: SelectQueryBuilder<T>,
  pagingOptions: { page: number; limit: number; orderBy: string },
) {
  const { page, limit, orderBy } = pagingOptions;
  if (orderBy) {
    const sort = orderBy.substring(0, orderBy.indexOf(':'));
    const order = orderBy.substring(orderBy.indexOf(':') + 1, orderBy.length);
    queryBuilder.orderBy(sort, order == 'ASC' ? 'ASC' : 'DESC');
  }

  if (page && limit) {
    const offset = (page - 1) * limit;
    queryBuilder.skip(offset).take(limit);
  }
  const a = queryBuilder;
  console.log('=====', await queryBuilder.getMany());
  
  const [data, count] = await queryBuilder.getManyAndCount();
  console.log({data});
  
  return {
    items: data,
    meta: {
      totalItems: count,
      itemCount: data.length,
      itemsPerPage: limit,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    },
  };
}
