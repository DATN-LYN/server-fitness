import { QueryFilterDto } from '@/common/dto';
import { Exercise } from '@/db/entities/Exercise';
import { customPaginate } from '@/utils/custom-paginate';
import { extractFilter } from '@/utils/extractFilter';
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

    extractFilter<Exercise>(
      builder,
      queryParams,
      'Exercise.name',
      'Exercise.programId',
    );
    
    return await customPaginate<Exercise>(builder, queryParams);
  }

  async deleteExercise(exerciseId: string) {
    await getManager()
      .getRepository(Exercise)
      .createQueryBuilder()
      .delete()
      .where({ id: exerciseId })
      .returning('id')
      .execute();

    return {
      message: 'true',
      success: true,
    };
  }
}
