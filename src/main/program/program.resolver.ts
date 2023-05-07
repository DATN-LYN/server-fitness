import { QueryFilterDto } from '@/common/dto';
import { Program } from '@/db/entities/Program';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpsertProgramInputDto } from './dto';
import { IProgram, IPrograms } from './interface';
import { ProgramService } from './program.service';

@Resolver()
export class ProgramResolver {
  constructor(private readonly programService: ProgramService) {}

  @Mutation(() => IProgram, { name: 'upsertProgram' })
  async upsertProgram(@Args('input') input: UpsertProgramInputDto) {
    return this.programService.upsertProgram(input);
  }

  @Query(() => Program, { name: 'getProgram' })
  async getProgram(@Args('programId') programId: string) {
    return this.programService.getProgram(programId);
  }

  @Query(() => IPrograms, { name: 'getPrograms' })
  async getPrograms(@Args('queryParams') queryParams: QueryFilterDto) {
    return this.programService.getPrograms(queryParams);
  }
}
