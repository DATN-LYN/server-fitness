import { Module } from '@nestjs/common';
import { UserProgramResolver } from './user_program.resolver';
import { UserProgramService } from './user_program.service';

@Module({ providers: [UserProgramResolver, UserProgramService],})
export class UserProgramModule {}
