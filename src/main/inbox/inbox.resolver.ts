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
    
    return this.inboxService.getMyInboxes(queryParams,  '4b216e9d-9af8-4e13-bde7-df1b8cef02b5');
  }

  @Mutation(() => ResponseMessageBase, { name: 'deleteInbox' })
  async deleteInbox(@Args('categoryId') categoryId: string) {
    return this.inboxService.deleteInbox(categoryId);
  }
}
