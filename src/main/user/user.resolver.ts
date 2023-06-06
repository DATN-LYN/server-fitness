import { QueryFilterDto, ResponseMessageBase } from '@/common/dto';
import { Context, GetContext } from '@/decorators/user.decorator';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpsertUserInputDto } from './dto';
import { IUser, IUsers } from './interface';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => IUser, { name: 'getUser' })
  async getUser(@Args('userId') userId: string) {
    return this.userService.getUser(userId);
  }


  @Query(() => IUser, { name: 'getCurrentUser' })
  async getCurrentUser(@GetContext() ctx: Context) {
    return this.userService.getCurrentUser(ctx.currentUser.id);
  }

  @Query(() => IUsers, { name: 'getUsers' })
  async getUsers(@Args('queryParams') queryParams: QueryFilterDto) {
    return this.userService.getUsers(queryParams);
  }

  @Query(() => IUsers, { name: 'getTopUsersProgram' })
  async getTopUsersProgram(@Args('queryParams') queryParams: QueryFilterDto) {
    
    return this.userService.getTopUsersProgram(queryParams);
  }  

  @Query(() => IUsers, { name: 'getTopUsersInbox' })
  async getTopUsersInbox(@Args('queryParams') queryParams: QueryFilterDto) {
    
    return this.userService.getTopUsersInbox(queryParams);
  }  

  @Mutation(() => ResponseMessageBase, { name: 'deleteUser' })
  async deleteUser(@Args('userId') userId: string) {
    return this.userService.deleteUser(userId);
  }

  @Mutation(() => IUser, { name: 'upsertUser' })
  async upsertUser(@Args('input') input: UpsertUserInputDto) {
    return this.userService.upsertUser(input);
  }
}
