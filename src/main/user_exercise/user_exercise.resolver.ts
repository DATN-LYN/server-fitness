import { QueryFilterDto, ResponseMessageBase } from '@/common/dto';
import { Context, GetContext } from '@/decorators/user.decorator';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpsertUserExerciseInputDto } from './dto';
import { IUserExercise, IUserExercises } from './interface';
import { UserExerciseService } from './user_exercise.service';
// import { Context, GetContext } from '@/decorators/user.decorator';

@Resolver()
export class UserExerciseResolver {
  constructor(private readonly userExerciseService: UserExerciseService) {}

  @Mutation(() => IUserExercise, { name: 'upsertUserExercise' })
  async upsertInbox(@Args('input') input: UpsertUserExerciseInputDto) {
    return this.userExerciseService.upsertUserExercise(input);
  }

  @Query(() => IUserExercise, { name: 'getUserExercise' })
  async getInbox(@Args('id') id: string) {
    return this.userExerciseService.getUserExercise(id);
  }

  @Query(() => IUserExercises, { name: 'getUserExercises' })
  async getStatsList(@Args('queryParams') queryParams: QueryFilterDto) {
    return this.userExerciseService.getUserExercises(queryParams);
  }

  @Query(() => IUserExercises, { name: 'getMyUserExercises' })
  async getMyStats(@Args('queryParams') queryParams: QueryFilterDto, @GetContext() ctx: Context) {
    
    return this.userExerciseService.getMyUserExercises(queryParams, ctx.currentUser.id);
  }

  @Mutation(() => ResponseMessageBase, { name: 'deleteUserExercise' })
  async deleteInbox(@Args('id') id: string) {
    return this.userExerciseService.deleteUserExercise(id);
  }
}
