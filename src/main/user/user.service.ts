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
        const user = await User.findOne({ id: userId });
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
        const { id } = input;
    
        const user = await User.findOne({ id });

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
