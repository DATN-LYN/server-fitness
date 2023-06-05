import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUserProgram1681392170421 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE TABLE IF NOT EXISTS "user_program" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "user_id" uuid NULL,
            "program_id" uuid NULL,
            "is_favorite" boolean NULL DEFAULT FALSE,
    
            "created_at" timestamp with time zone DEFAULT NOW(),
            "updated_at" timestamp with time zone DEFAULT NOW(),
    
            CONSTRAINT "PK_UserProgram" PRIMARY KEY ("id"),
            CONSTRAINT "FK_UserProgram_User" FOREIGN KEY ("user_id") REFERENCES "user" ("id"),
            CONSTRAINT "FK_UserProgram_Program" FOREIGN KEY ("program_id") REFERENCES "program" ("id")
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS "user_program"
    `);
  }
}
