- Node: v16.18.1
- Database Postgresql: Node 12 or 14

- Create Migration: yarn migration:create file_name
- Run Migration: yarn migration:run
- Revert Migration: yarn migration:revert

- Config Database: 
  + src\db\connectionConfig.ts

- Add Entities into Database
  + src\db\connectionConfig.ts

- Config Filter:
  + FILTER_OPERATOR
  + src\utils\extractFilter.ts