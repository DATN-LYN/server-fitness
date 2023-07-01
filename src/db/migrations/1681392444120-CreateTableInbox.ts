import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableInbox1681392444120 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS "inbox" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "is_sender" bool NOT NULL,
        "message" VARCHAR(2048) NOT NULL,
        "user_id" uuid NOT NULL,

        "created_at" timestamp with time zone DEFAULT NOW(),
        "updated_at" timestamp with time zone DEFAULT NOW(),

        CONSTRAINT "PK_Inbox" PRIMARY KEY ("id"),
        CONSTRAINT "FK_Inbox_User" FOREIGN KEY ("user_id") REFERENCES "user" ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS "inbox"
    `);
  }
}
