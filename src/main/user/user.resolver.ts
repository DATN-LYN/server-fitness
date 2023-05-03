import { QueryFilterDto } from '@/common/dto';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { IUser, IUsers } from './interface';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => IUser, { name: 'getUser' })
  async getProgram(@Args('userId') userId: string) {
    return this.userService.getUser(userId);
  }

  @Query(() => IUsers, { name: 'getUsers' })
  async getPrograms(@Args('queryParams') queryParams: QueryFilterDto) {
    return this.userService.getUsers(queryParams);
  }
}
