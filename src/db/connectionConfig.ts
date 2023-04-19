import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Category } from './entities/Category';

export const connectionConfig: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'nhi111',
  database: 'fitness',
  cli: {
    migrationsDir: 'migrations',
    entitiesDir: 'entities',
  },
  // entities: [`${__dirname}/entities/*{.ts,.js}`],
  entities: [Category],
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  namingStrategy: new SnakeNamingStrategy(),
};
