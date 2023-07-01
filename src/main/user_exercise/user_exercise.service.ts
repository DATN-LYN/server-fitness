import { QueryFilterDto } from '@/common/dto';
import { UserExercise } from '@/db/entities/UserExercise';
import { customPaginate } from '@/utils/custom-paginate';
import { Injectable, NotFoundException } from '@nestjs/common';
import { getManager } from 'typeorm';
import { UpsertUserExerciseInputDto } from './dto';

@Injectable()
export class UserExerciseService {
  async upsertUserExercise(input: UpsertUserExerciseInputDto) {

    const transaction = getManager();
    const newStats = transaction
      .getRepository(UserExercise)
      .merge(UserExercise.create(), { ...input });

    return await transaction.getRepository(UserExercise).save(newStats)  
  }

  async getUserExercise(statsId: string) {
    const stats = await UserExercise.findOne({ id: statsId });
    if (!stats) {
      throw new NotFoundException('UserExercise not found');
    }

    return stats;
  }
  async getUserExercises(queryParams: QueryFilterDto) {
    const builder = UserExercise.createQueryBuilder();

    return await customPaginate<UserExercise>(builder, queryParams);
  }

  async getMyUserExercises(queryParams: QueryFilterDto, userId:string) {
    const builder = UserExercise.createQueryBuilder().where({ userId });

    return await customPaginate<UserExercise>(builder, queryParams);
  }

  async deleteUserExercise(id: string) {
    await getManager()
      .getRepository(UserExercise)
      .createQueryBuilder()
      .delete()
      .where({ id: id })
      .returning('id')
      .execute();

    return {
      message: 'true',
      success: true,
    };
  }
}
