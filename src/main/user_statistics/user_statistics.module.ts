import { Module } from '@nestjs/common';
import { UserStatisticsResolver } from './user_statistics.resolver';
import { UserStatisticsService } from './user_statistics.service';

@Module({ providers: [UserStatisticsResolver, UserStatisticsService],})
export class UserStatisticsModule {}
