import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { UpsertCategoryInputDto } from './dto';
import { ICategories, ICategory } from './interface';
import { QueryFilterDto, ResponseMessageBase } from '@/common/dto';

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => ICategory, { name: 'upsertCategory' })
  async upsertCategory(@Args('input') input: UpsertCategoryInputDto) {
    return this.categoryService.upsertCategory(input);
  }

  @Query(() => ICategory, { name: 'getCategory' })
  async getCategory(@Args('categoryId') categoryId: string) {
    return this.categoryService.getCategory(categoryId);
  }

  @Query(() => ICategories, { name: 'getCategories' })
  async getCategories(@Args('queryParams') queryParams: QueryFilterDto) {
    return this.categoryService.getCategories(queryParams);
  }

  @Mutation(() => ResponseMessageBase, { name: 'deleteCategory' })
  async deleteCategory(@Args('categoryId') categoryId: string) {
    return this.categoryService.deleteCategory(categoryId);
  }
}
