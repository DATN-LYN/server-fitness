import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUserExercise1681392346718
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "user_exercise" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "user_id" uuid NULL,
            "exercise_id" uuid NULL,
    
            "created_at" timestamp with time zone DEFAULT NOW(),
            "updated_at" timestamp with time zone DEFAULT NOW(),
    
            CONSTRAINT "PK_UserExercise" PRIMARY KEY ("id"),
            CONSTRAINT "FK_UserExercise_User" FOREIGN KEY ("user_id") REFERENCES "user" ("id"),
            CONSTRAINT "FK_UserExercise_Exercise" FOREIGN KEY ("exercise_id") REFERENCES "exercise" ("id")
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS "user_exercise"
    `);
  }
}
