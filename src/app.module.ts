import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLError } from 'graphql';
import { UserModule } from './main/user/user.module';
import { RoleModule } from './main/role/role.module';
import { ProgramModule } from './main/program/program.module';
import { DatabaseModule } from './module/database.module';
import { CategoryModule } from './main/category/category.module';

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
      include: [UserModule, RoleModule, ProgramModule, CategoryModule],
    }),
    UserModule,
    RoleModule,
    ProgramModule,
    CategoryModule,
  ],
})
export class AppModule {}

export class ResponseExceptionError {
  statusCode: number;
  message: string;
  error: string;
}
