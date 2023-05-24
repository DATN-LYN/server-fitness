import { QueryFilterDto } from '@/common/dto';
import { Program } from '@/db/entities/Program';
import { customPaginate } from '@/utils/custom-paginate';
import { extractFilter } from '@/utils/extractFilter';
import { Injectable, NotFoundException } from '@nestjs/common';
import { getManager } from 'typeorm';
import { UpsertProgramInputDto } from './dto';
import { User } from '@/db/entities/User';
import { Exercise } from '@/db/entities/Exercise';
import { Category } from '@/db/entities/Category';

@Injectable()
export class ProgramService {
  async upsertProgram(input: UpsertProgramInputDto) {
    const { id } = input;

    const program = await Program.findOne({ id });

    const transaction = getManager();
    const newProgram = transaction
      .getRepository(Program)
      .merge(program ?? Program.create(), { ...input });

    return await transaction.getRepository(Program).save(newProgram);
  }

  async getProgram(programId: string) {
    const program = await Program.findOne({ id: programId });
    if (!program) {
      throw new NotFoundException('Program not found');
    }

    return program;
  }

  async getPrograms(queryParams: QueryFilterDto) {
    const builder = Program.createQueryBuilder().leftJoinAndSelect('Program.category', 'category');
    extractFilter<Program>(
      builder,
      queryParams,
      'Program.name',
      'Program.level',
      'Program.categoryId',
      'Program.createdAt'
    );
    
    return await customPaginate<Program>(builder, queryParams);
  }

  async deleteProgram(programId: string) {
    await getManager()
      .getRepository(Program)
      .createQueryBuilder()
      .delete()
      .where({ id: programId })
      .returning('id')
      .execute();

    return {
      message: 'true',
      success: true,
    };
  }

  async getProgramCountBABCBCBCBC() {
    const [userCnt, programCnt, exerciseCnt, categoryCnt] = await Promise.all([
      User.count(),
      Program.count(),
      Exercise.count(),
      Category.count()
    ]);

    return {
      userCnt, programCnt, exerciseCnt, categoryCnt
    }
  }
}
