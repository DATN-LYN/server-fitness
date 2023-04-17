import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProgramService } from './program.service';
import { IProgram } from './interface';
import { UpsertProgramInputDto } from './dto';

@Resolver()
export class ProgramResolver {
  constructor(private readonly programService: ProgramService) {}

  @Mutation(() => IProgram, { name: 'upsertProgram' })
  async upsertProgram(@Args('input') input: UpsertProgramInputDto) {
    return this.programService.upsertProgram(input);
  }

  @Query(() => IProgram, { name: 'getProgram' })
  async getProgram(@Args('programId') programId: string) {
    return this.programService.getProgram(programId);
  }
}
