import { QueryFilterDto } from '@/common/dto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpsertExerciseInputDto } from './dto';
import { ExerciseService } from './exercise.service';
import { IExercise, IExercises } from './interface';

@Resolver()
export class ExerciseResolver {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Mutation(() => IExercise, { name: 'upsertExercise' })
  async upsertProgram(@Args('input') input: UpsertExerciseInputDto) {
    return this.exerciseService.upsertProgram(input);
  }

  @Query(() => IExercise, { name: 'getExercise' })
  async getProgram(@Args('programId') programId: string) {
    return this.exerciseService.getExercise(programId);
  }

  @Query(() => IExercises, { name: 'getExercises' })
  async getPrograms(@Args('queryParams') queryParams: QueryFilterDto) {
    return this.exerciseService.getExercises(queryParams);
  }
}
