import { QueryFilterDto } from '@/common/dto';
import { UserProgram } from '@/db/entities/UserProgram';
import { customPaginate } from '@/utils/custom-paginate';
import { Injectable, NotFoundException } from '@nestjs/common';
import { getManager } from 'typeorm';
import { UpsertUserProgramInputDto } from './dto';

@Injectable()
export class UserProgramService {
  async upsertUserProgram(input: UpsertUserProgramInputDto) {

    const userProgramExists = await UserProgram.findOne({ userId: input.userId, programId: input.programId });
    if (userProgramExists) {
      await UserProgram.save(userProgramExists)
      return userProgramExists;
    }

    const transaction = getManager();
    const newStats = transaction
      .getRepository(UserProgram)
      .merge(UserProgram.create(), { ...input });

    return await transaction.getRepository(UserProgram).save(newStats)  
  }

  async getUserProgram(id: string) {
    const stats = await UserProgram.findOne({ id: id });
    if (!stats) {
      throw new NotFoundException('UserProgram not found');
    }

    return stats;
  }
  async getUserPrograms(queryParams: QueryFilterDto) {
    const builder = UserProgram.createQueryBuilder();

    return await customPaginate<UserProgram>(builder, queryParams);
  }

  async getMyUserPrograms(queryParams: QueryFilterDto, userId:string) {
    const builder = UserProgram.createQueryBuilder().where({ userId });

    return await customPaginate<UserProgram>(builder, queryParams);
  }

  async deleteUserProgram(id: string) {
    await getManager()
      .getRepository(UserProgram)
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
