import { Module } from '@nestjs/common';
import { UserExerciseResolver } from './user_exercise.resolver';
import { UserExerciseService } from './user_exercise.service';

@Module({ providers: [UserExerciseResolver, UserExerciseService],})
export class UserExerciseModule {}
