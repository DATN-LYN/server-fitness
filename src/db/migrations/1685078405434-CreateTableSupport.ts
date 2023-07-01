import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableSupport1685078405434 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS "support" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "user_id" uuid NOT NULL,
        "content" VARCHAR(2048) NULL,
        "img_url" VARCHAR(2048) NULL,
        "is_read" bool NULL,
        "status" VARCHAR NULL,


        "created_at" timestamp with time zone DEFAULT NOW(),
        "updated_at" timestamp with time zone DEFAULT NOW(),

        CONSTRAINT "PK_Support" PRIMARY KEY ("id"),
        CONSTRAINT "FK_Support_User" FOREIGN KEY ("user_id") REFERENCES "user" ("id")
      )
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE IF EXISTS "support"
     `);
    }

}
