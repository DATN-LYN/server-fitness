import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Category } from './entities/Category';
import { Exercise } from './entities/Exercise';
import { Inbox } from './entities/Inbox';
import { Program } from './entities/Program';
import { Role } from './entities/Role';
import { Support } from './entities/Support';
import { User } from './entities/User';
import { UserExercise } from './entities/UserExercise';
import { UserProgram } from './entities/UserProgram';
import { UserStatistics } from './entities/UserStatistics';

// host: 'fitness-db-datn.flycast',
// port: 5432,
// username: 'fitness_server_datn',
// password: 'Lf3tQC7iYAAvl3T',
// database: 'fitness_server_datn',

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
  entities: [
    Category, 
    Inbox, 
    User, 
    Role, 
    Program, 
    Exercise, 
    UserStatistics, 
    UserExercise, 
    UserProgram,
    Support
  ],
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  namingStrategy: new SnakeNamingStrategy(),
};
