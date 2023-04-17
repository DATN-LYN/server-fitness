import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableMessage1681392521020 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS "message" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "inbox_id" uuid NOT NULL,

        "created_at" timestamp with time zone DEFAULT NOW(),
        "updated_at" timestamp with time zone DEFAULT NOW(),

        CONSTRAINT "PK_Message" PRIMARY KEY ("id"),
        CONSTRAINT "FK_Message_Inbox" FOREIGN KEY ("inbox_id") REFERENCES "inbox" ("id")
    )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS "message"
    `);
  }
}
