import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Category } from './entities/Category';
import { Inbox } from './entities/Inbox';
import { Role } from './entities/Role';
import { User } from './entities/User';

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
  entities: [Category, Inbox, User, Role],
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  namingStrategy: new SnakeNamingStrategy(),
};
