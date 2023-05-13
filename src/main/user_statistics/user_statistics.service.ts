import { QueryFilterDto } from '@/common/dto';
import { UserStatistics } from '@/db/entities/UserStatistics';
import { customPaginate } from '@/utils/custom-paginate';
import { Injectable, NotFoundException } from '@nestjs/common';
import { getManager } from 'typeorm';
import { UpsertUserStatisticsInputDto } from './dto';

@Injectable()
export class UserStatisticsService {
  async upsertStats(input: UpsertUserStatisticsInputDto) {

    const transaction = getManager();
    const newStats = transaction
      .getRepository(UserStatistics)
      .merge(UserStatistics.create(), { ...input });

    return await transaction.getRepository(UserStatistics).save(newStats)  
  }

  async getStats(statsId: string) {
    const stats = await UserStatistics.findOne({ id: statsId });
    if (!stats) {
      throw new NotFoundException('Statistics not found');
    }

    return stats;
  }
  async getStatsList(queryParams: QueryFilterDto) {
    const builder = UserStatistics.createQueryBuilder();

    return await customPaginate<UserStatistics>(builder, queryParams);
  }

  async getMyStats(queryParams: QueryFilterDto, userId:string) {
    const builder = UserStatistics.createQueryBuilder().where({ userId });

    return await customPaginate<UserStatistics>(builder, queryParams);
  }

  async deleteStats(statsId: string) {
    await getManager()
      .getRepository(UserStatistics)
      .createQueryBuilder()
      .delete()
      .where({ id: statsId })
      .returning('id')
      .execute();

    return {
      message: 'true',
      success: true,
    };
  }
}
