/* eslint-disable prefer-const */
import { Connection, createConnection, ConnectionOptions } from 'typeorm';
import { connectionConfig } from './connectionConfig';

const main = async () => {
  const ormConfig: ConnectionOptions = connectionConfig;
  const connection: Connection = await createConnection(ormConfig);

  if (process.argv[2] === 'run') {
    await connection.runMigrations({ transaction: 'all' });
  }
  if (process.argv[2] === 'revert') {
    await connection.undoLastMigration({ transaction: 'all' });
  }
};
main();
