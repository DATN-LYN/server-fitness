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
        const builder = User.createQueryBuilder();
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
            'userExercises.exercise'
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
          'userExercises.exercise'
        ]
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }
  
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
        const { email } = input;
    
        const user = await User.findOne({ email });

        if (!user) {
          throw new NotFoundException('User not found');
        }
        const transaction = getManager();
        const newUser = transaction
          .getRepository(User)
          .merge(user, { ...input });
    
        return await transaction.getRepository(User).save(newUser);
    }
}
