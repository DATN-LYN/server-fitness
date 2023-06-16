import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUser1681379415322 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS "user" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "email" VARCHAR(255) NOT NULL,
            "password" TEXT NOT NULL,
            "full_name" VARCHAR(255) NULL,
            "google_id" TEXT NULL,
            "avatar" VARCHAR(2048) NULL,
            "age" int NULL,
            "gender" VARCHAR(255) null,
            "user_role" VARCHAR(255) null,
            "refresh_token" TEXT NULL,
            "role_id" uuid null,
            "is_active" boolean NULL DEFAULT TRUE,
            "created_at" timestamp with time zone DEFAULT NOW(),
            "updated_at" timestamp with time zone DEFAULT NOW(),

            CONSTRAINT "PK_User" PRIMARY KEY ("id"),
            CONSTRAINT "UQ_User_Email" UNIQUE ("email"),
            CONSTRAINT "FK_User_Role" FOREIGN KEY ("role_id") REFERENCES "role" ("id")
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS "user"
    `);
  }
}
