import { QueryFilterDto, ResponseMessageBase } from '@/common/dto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpsertUserStatisticsInputDto } from './dto';
import { IUserStatistics, IUserStatisticses } from './interface';
import { UserStatisticsService } from './user_statistics.service';
// import { Context, GetContext } from '@/decorators/user.decorator';

@Resolver()
export class UserStatisticsResolver {
  constructor(private readonly statsService: UserStatisticsService) {}

  @Mutation(() => IUserStatistics, { name: 'upsertStats' })
  async upsertInbox(@Args('input') input: UpsertUserStatisticsInputDto) {
    return this.statsService.upsertStats(input);
  }

  @Query(() => IUserStatistics, { name: 'getStats' })
  async getInbox(@Args('statsId') statsId: string) {
    return this.statsService.getStats(statsId);
  }

  @Query(() => IUserStatisticses, { name: 'getStatsList' })
  async getStatsList(@Args('queryParams') queryParams: QueryFilterDto) {
    return this.statsService.getStatsList(queryParams);
  }

  @Query(() => IUserStatisticses, { name: 'getMyStats' })
  async getMyStats(@Args('queryParams') queryParams: QueryFilterDto) {
    //  @GetContext() ctx: Context
    console.log(queryParams);
    
    return this.statsService.getMyStats(queryParams,  'f80200e4-b36b-4803-b5c0-dd0c0ef8cb89');
  }

  @Mutation(() => ResponseMessageBase, { name: 'deleteStats' })
  async deleteInbox(@Args('statsId') statsId: string) {
    return this.statsService.deleteStats(statsId);
  }
}
