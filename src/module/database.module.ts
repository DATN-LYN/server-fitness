import { connectionConfig } from '@/db/connectionConfig';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const dbConfig = connectionConfig;
        return {
          ...dbConfig,
          keepConnectionAlive: true,
          logging: true,
          migrationsRun: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
