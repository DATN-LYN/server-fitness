import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { AuthModule } from './main/auth/auth.module';
import { CategoryModule } from './main/category/category.module';
import { ExerciseModule } from './main/exercise/exercise.module';
import { InboxModule } from './main/inbox/inbox.module';
import { ProgramModule } from './main/program/program.module';
import { RoleModule } from './main/role/role.module';
import { UserModule } from './main/user/user.module';
import { UserStatisticsModule } from './main/user_statistics/user_statistics.module';
import { DatabaseModule } from './module/database.module';

@Module({
  imports: [
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      path: '/graphql',
      autoSchemaFile: 'schema.gql',
      formatError: (error: GraphQLError) => {
        const res = error.extensions?.originalError as ResponseExceptionError;
        const graphQLFormattedError: any = {
          statusCode: res?.statusCode || 500,
          message: error.message,
        };
        return graphQLFormattedError;
      },
      include: [
        UserModule, 
        RoleModule, 
        ProgramModule, 
        CategoryModule, 
        InboxModule,  
        AuthModule, 
        ProgramModule, 
        ExerciseModule,
        UserStatisticsModule
      ]
    }),
    UserModule,
    RoleModule,
    ProgramModule,
    CategoryModule,
    InboxModule,
    AuthModule,
    ProgramModule,
    ExerciseModule,
    UserStatisticsModule,
  ],
})
export class AppModule {}

export class ResponseExceptionError {
  statusCode: number;
  message: string;
  error: string;
}
