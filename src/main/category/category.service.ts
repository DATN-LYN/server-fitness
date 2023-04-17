import { Injectable, NotFoundException } from '@nestjs/common';
import { UpsertCategoryInputDto } from './dto';
import { Category } from '@/db/entities/Category';
import { getManager } from 'typeorm';
import { QueryFilterDto } from '@/common/dto';
import { customPaginate } from '@/utils/custom-paginate';
import { extractFilter } from '@/utils/extractFilter';

@Injectable()
export class CategoryService {
  async upsertCategory(input: UpsertCategoryInputDto) {
    const { id } = input;

    const category = await Category.findOne({ id });

    const transaction = getManager();
    const newCategory = transaction
      .getRepository(Category)
      .merge(category ?? Category.create(), { ...input });

    return await transaction.getRepository(Category).save(newCategory);
  }

  async getCategory(categoryId: string) {
    const category = await Category.findOne({ id: categoryId });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }
  async getCategories(queryParams: QueryFilterDto) {
    const builder = Category.createQueryBuilder();
    extractFilter<Category>(
      builder,
      queryParams,
      'Category.name',
      'Category.imgUrl',
    );

    return await customPaginate<Category>(builder, queryParams);
  }

  async deleteCategory(categoryId: string) {
    await getManager()
      .getRepository(Category)
      .createQueryBuilder()
      .delete()
      .where({ id: categoryId })
      .returning('id')
      .execute();

    return {
      message: 'true',
      success: true,
    };
  }
}
