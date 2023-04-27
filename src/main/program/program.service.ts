import { QueryFilterDto } from '@/common/dto';
import { Program } from '@/db/entities/Program';
import { customPaginate } from '@/utils/custom-paginate';
import { Injectable, NotFoundException } from '@nestjs/common';
import { getManager } from 'typeorm';
import { UpsertProgramInputDto } from './dto';

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
    const builder = Program.createQueryBuilder();
    
    return await customPaginate<Program>(builder, queryParams);
  }
}
