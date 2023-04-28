import { QueryFilterDto } from '@/common/dto';
import { Exercise } from '@/db/entities/Exercise';
import { customPaginate } from '@/utils/custom-paginate';
import { Injectable, NotFoundException } from '@nestjs/common';
import { getManager } from 'typeorm';
import { UpsertExerciseInputDto } from './dto';

@Injectable()
export class ExerciseService {
  async upsertProgram(input: UpsertExerciseInputDto) {
    const { id } = input;

    const exercise = await Exercise.findOne({ id });

    const transaction = getManager();
    const newExercise = transaction
      .getRepository(Exercise)
      .merge(exercise ?? Exercise.create(), { ...input });

    return await transaction.getRepository(Exercise).save(newExercise);
  }

  async getExercise(exerciseId: string) {
    const exercise = await Exercise.findOne({ id: exerciseId });
    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }

    return exercise;
  }

  async getExercises(queryParams: QueryFilterDto) {
    const builder = Exercise.createQueryBuilder();
    
    return await customPaginate<Exercise>(builder, queryParams);
  }
}