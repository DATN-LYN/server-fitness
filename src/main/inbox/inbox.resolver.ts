import { QueryFilterDto, ResponseMessageBase } from '@/common/dto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpsertInboxInputDto } from './dto';
import { InboxService } from './inbox.service';
import { IInbox, IInboxes } from './interface';
// import { Context, GetContext } from '@/decorators/user.decorator';

@Resolver()
export class InboxResolver {
  constructor(private readonly inboxService: InboxService) {}

  @Mutation(() => IInbox, { name: 'upsertInbox' })
  async upsertInbox(@Args('input') input: UpsertInboxInputDto) {
    return this.inboxService.upsertInbox(input);
  }

  @Query(() => IInbox, { name: 'getInbox' })
  async getInbox(@Args('categoryId') categoryId: string) {
    return this.inboxService.getInbox(categoryId);
  }

  @Query(() => IInboxes, { name: 'getInboxes' })
  async getInboxes(@Args('queryParams') queryParams: QueryFilterDto) {
    return this.inboxService.getInboxes(queryParams);
  }

  @Query(() => IInboxes, { name: 'getMyInboxes' })
  async getMyInboxes(@Args('queryParams') queryParams: QueryFilterDto) {
    //  @GetContext() ctx: Context
    console.log(queryParams);
    
    return this.inboxService.getMyInboxes(queryParams,  'f80200e4-b36b-4803-b5c0-dd0c0ef8cb89');
  }

  @Mutation(() => ResponseMessageBase, { name: 'deleteInbox' })
  async deleteInbox(@Args('inboxId') inboxId: string) {
    return this.inboxService.deleteInbox(inboxId);
  }
}
