import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableRole1681378415322 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS "role" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "name" uuid NULL,

            "created_at" timestamp with time zone DEFAULT NOW(),
            "updated_at" timestamp with time zone DEFAULT NOW(),

            CONSTRAINT "PK_Role" PRIMARY KEY ("id"),
            CONSTRAINT "UQ_Role_Name" UNIQUE ("name")
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS "role"
    `);
  }
}
