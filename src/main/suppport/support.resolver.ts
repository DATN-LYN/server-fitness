import { QueryFilterDto, ResponseMessageBase } from '@/common/dto';
import { Context, GetContext } from '@/decorators/user.decorator';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpsertSupportInputDto } from './dto';
import { ISupport, ISupports } from './interface';
import { SupportService } from './support.service';
// import { Context, GetContext } from '@/decorators/user.decorator';

@Resolver()
export class SupportResolver {
  constructor(private readonly supportService: SupportService) {}

  @Mutation(() => ISupport, { name: 'upsertSupport' })
  async upsertSupport(@Args('input') input: UpsertSupportInputDto) {
    return this.supportService.upsertSupport(input);
  }

  @Query(() => ISupport, { name: 'getSupport' })
  async getInbox(@Args('supportId') supportId: string) {
    return this.supportService.getSupport(supportId);
  }

  @Query(() => ISupports, { name: 'getSupports' })
  async getSupports(@Args('queryParams') queryParams: QueryFilterDto) {
    return this.supportService.getSupports(queryParams);
  }

  @Query(() => ISupports, { name: 'getMySupports' })
  async getMySupports(@Args('queryParams') queryParams: QueryFilterDto,  @GetContext() ctx: Context) {

    
    return this.supportService.getMySupports(queryParams, ctx.currentUser.id );
  }

  @Mutation(() => ResponseMessageBase, { name: 'deleteSupport' })
  async deleteInbox(@Args('supportId') supportId: string) {
    return this.supportService.deleteSupport(supportId);
  }
}
