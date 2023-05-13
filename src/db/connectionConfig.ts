import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Category } from './entities/Category';
import { Exercise } from './entities/Exercise';
import { Inbox } from './entities/Inbox';
import { Program } from './entities/Program';
import { Role } from './entities/Role';
import { User } from './entities/User';
import { UserStatistics } from './entities/UserStatistics';

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
  entities: [Category, Inbox, User, Role, Program, Exercise, UserStatistics],
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  namingStrategy: new SnakeNamingStrategy(),
};
