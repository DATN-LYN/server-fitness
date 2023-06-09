import { QueryFilterDto } from '@/common/dto';
import { User } from '@/db/entities/User';
import { customPaginate } from '@/utils/custom-paginate';
import { extractFilter } from '@/utils/extractFilter';
import { Injectable, NotFoundException } from '@nestjs/common';
import { getManager } from 'typeorm';
import { UpsertUserInputDto } from './dto';

@Injectable()
export class UserService {
    async getUsers(queryParams: QueryFilterDto) {
        const builder = User.createQueryBuilder().leftJoin('User.inboxes', 'inboxes');
        extractFilter<User>(
          builder,
          queryParams,
          'User.fullName',
          'User.email',
          'User.userRole',
          'User.isActive',
          'User.gender'
        );
        
        return await customPaginate<User>(builder, queryParams);
    }

    async getTopUsersProgram(queryParams: QueryFilterDto) {
      const builder = User.createQueryBuilder()
        .leftJoin('User.userPrograms', 'userPrograms')
        .addSelect('COUNT(userPrograms.id)', 'User_count_program')
        .groupBy('User.id');

      extractFilter<User>(
        builder,
        queryParams,
        'User.fullName',
      );
      
      return await customPaginate<User>(builder, queryParams);
  }

  async getTopUsersInbox(queryParams: QueryFilterDto) {
    const builder = User.createQueryBuilder()
    .leftJoin('User.inboxes', 'inboxes')
    .addSelect('COUNT(inboxes.id)', 'User_count_inbox')
    .groupBy('User.id');

    extractFilter<User>(
      builder,
      queryParams,
      'User.fullName',
    );

    return await customPaginate<User>(builder, queryParams);
}

    async getUser(userId: string) {
        const user = User.findOne({ 
          where: { id: userId }, 
          relations: [
            'userPrograms',
            'userPrograms.program',
            'userExercises',
            'userExercises.exercise',
            'inboxes',
            'inboxes.user',

          ]
        });

        if (!user) {
          throw new NotFoundException('User not found');
        }
    
        return user;
    }

    async getCurrentUser(userId: string) {
      const user = User.findOne({ 
        where: { id: userId }, 
        relations: [
          'userPrograms',
          'userPrograms.program',
          'userExercises',
          'userExercises.exercise',
          'inboxes',
          'inboxes.user',
        ]
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }
      console.log(user);

      return user;
  }

    async deleteUser(userId: string) {
        await getManager()
          .getRepository(User)
          .createQueryBuilder()
          .delete()
          .where({ id: userId })
          .returning('id')
          .execute();
    
        return {
          message: 'true',
          success: true,
        };
      }

    async upsertUser(input: UpsertUserInputDto) {
      console.log({input});
      
        const { email } = input;
    
        const user = await User.findOne({ where: { email: email } });
      
        const transaction = getManager();
        const newUser = transaction
          .getRepository(User)
          .merge(user ?? User.create(), { ...input });
    
        return await transaction.getRepository(User).save(newUser);
    }
}
