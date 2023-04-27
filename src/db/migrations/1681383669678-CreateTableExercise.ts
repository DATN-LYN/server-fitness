import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableExercise1681383669678 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "exercise" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" VARCHAR(255) NULL,
        "duration" VARCHAR(255) NULL,
        "video_url" VARCHAR(2048) NULL, 
        "img_url" VARCHAR(2048) NULL,
        "set_num" float NULL, 
        "calo" float NULL, 
        "program_id" uuid null,
        "created_at" timestamp with time zone DEFAULT NOW(),
        "updated_at" timestamp with time zone DEFAULT NOW(),

        CONSTRAINT "PK_Exercise" PRIMARY KEY ("id"),
        CONSTRAINT "FK_Exercise_Program" FOREIGN KEY ("program_id") REFERENCES "program" ("id"),
        CONSTRAINT "UQ_Exercise_Name" UNIQUE ("name")
      )
  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS "exercise"
    `);
  }
}
