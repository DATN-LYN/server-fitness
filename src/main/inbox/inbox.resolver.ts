import { QueryFilterDto, ResponseMessageBase } from '@/common/dto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpsertInboxInputDto } from './dto';
import { InboxService } from './inbox.service';
import { IInbox, IInboxes } from './interface';

@Resolver()
export class InboxResolver {
  constructor(private readonly categoryService: InboxService) {}

  @Mutation(() => IInbox, { name: 'upsertInbox' })
  async upsertInbox(@Args('input') input: UpsertInboxInputDto) {
    return this.categoryService.upsertInbox(input);
  }

  @Query(() => IInbox, { name: 'getInbox' })
  async getInbox(@Args('categoryId') categoryId: string) {
    return this.categoryService.getInbox(categoryId);
  }

  @Query(() => IInboxes, { name: 'getInboxes' })
  async getInboxes(@Args('queryParams') queryParams: QueryFilterDto) {
    return this.categoryService.getInboxes(queryParams);
  }

  @Mutation(() => ResponseMessageBase, { name: 'deleteInbox' })
  async deleteInbox(@Args('categoryId') categoryId: string) {
    return this.categoryService.deleteInbox(categoryId);
  }
}
