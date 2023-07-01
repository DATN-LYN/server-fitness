import { QueryFilterDto, ResponseMessageBase } from '@/common/dto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpsertExerciseInputDto } from './dto';
import { ExerciseService } from './exercise.service';
import { IExercise, IExercises } from './interface';

@Resolver()
export class ExerciseResolver {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Mutation(() => IExercise, { name: 'upsertExercise' })
  async upsertExercise(@Args('input') input: UpsertExerciseInputDto) {
    return this.exerciseService.upsertExercise(input);
  }

  @Query(() => IExercise, { name: 'getExercise' })
  async getExercise(@Args('exerciseId') exerciseId: string) {
    return this.exerciseService.getExercise(exerciseId);
  }

  @Query(() => IExercises, { name: 'getExercises' })
  async getExercises(@Args('queryParams') queryParams: QueryFilterDto) {
    return this.exerciseService.getExercises(queryParams);
  }

  @Mutation(() => ResponseMessageBase, { name: 'deleteExercise' })
  async deleteExercise(@Args('exerciseId') exerciseId: string) {
    return this.exerciseService.deleteExercise(exerciseId);
  }
}
