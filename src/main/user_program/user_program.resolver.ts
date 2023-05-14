import { QueryFilterDto, ResponseMessageBase } from '@/common/dto';
import { Context, GetContext } from '@/decorators/user.decorator';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpsertUserProgramInputDto } from './dto';
import { IUserProgram, IUserPrograms } from './interface';
import { UserProgramService } from './user_program.service';
// import { Context, GetContext } from '@/decorators/user.decorator';

@Resolver()
export class UserProgramResolver {
  constructor(private readonly userProgramService: UserProgramService) {}

  @Mutation(() => IUserProgram, { name: 'upsertUserProgram' })
  async upsertInbox(@Args('input') input: UpsertUserProgramInputDto) {
    return this.userProgramService.upsertUserProgram(input);
  }

  @Query(() => IUserProgram, { name: 'getUserProgram' })
  async getInbox(@Args('id') id: string) {
    return this.userProgramService.getUserProgram(id);
  }

  @Query(() => IUserPrograms, { name: 'getUserPrograms' })
  async getStatsList(@Args('queryParams') queryParams: QueryFilterDto) {
    return this.userProgramService.getUserPrograms(queryParams);
  }

  @Query(() => IUserPrograms, { name: 'getMyUserPrograms' })
  async getMyStats(@Args('queryParams') queryParams: QueryFilterDto, @GetContext() ctx: Context) {
    
    return this.userProgramService.getMyUserPrograms(queryParams, ctx.currentUser.id);
  }

  @Mutation(() => ResponseMessageBase, { name: 'deleteUserProgram' })
  async deleteInbox(@Args('id') id: string) {
    return this.userProgramService.deleteUserProgram(id);
  }
}
