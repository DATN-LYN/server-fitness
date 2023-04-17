import { Injectable, NotFoundException } from '@nestjs/common';
import { UpsertProgramInputDto } from './dto';
import { Program } from '@/db/entities/Program';
import { getManager } from 'typeorm';

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
}
