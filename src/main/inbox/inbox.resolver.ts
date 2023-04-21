import { QueryFilterDto, ResponseMessageBase } from '@/common/dto';
import { Context, GetContext } from '@/decorators/user.decorator';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpsertInboxInputDto } from './dto';
import { InboxService } from './inbox.service';
import { IInbox, IInboxes } from './interface';
// import { Context, GetContext } from '@/decorators/user.decorator';

@Resolver()
export class InboxResolver {
  constructor(private readonly categoryService: InboxService) {}

  @Mutation(() => IInboxes, { name: 'upsertInbox' })
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

  @Query(() => IInboxes, { name: 'getMyInboxes' })
  async getMyInboxes(@Args('queryParams') queryParams: QueryFilterDto, @GetContext() ctx: Context) {
    return this.categoryService.getMyInboxes(queryParams,  ctx.currentUser.id);
  }

  @Mutation(() => ResponseMessageBase, { name: 'deleteInbox' })
  async deleteInbox(@Args('categoryId') categoryId: string) {
    return this.categoryService.deleteInbox(categoryId);
  }
}
