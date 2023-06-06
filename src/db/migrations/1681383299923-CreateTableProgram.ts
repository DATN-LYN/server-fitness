import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableProgram1681383299923 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "program" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" VARCHAR(255) NOT NULL,
                "body_part" VARCHAR NULL,
                "level" VARCHAR NULL, 
                "view" int NULL, 
                "description" VARCHAR(255) NULL,
                "img_url" VARCHAR(2048) NULL,
                "category_id" uuid null,
                "created_at" timestamp with time zone DEFAULT NOW(),
                "updated_at" timestamp with time zone DEFAULT NOW(),
    
                CONSTRAINT "PK_Program" PRIMARY KEY ("id"),
                CONSTRAINT "FK_Program_Category" FOREIGN KEY ("category_id") REFERENCES "category" ("id"),
                CONSTRAINT "UQ_Program_Name" UNIQUE ("name")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE IF EXISTS "program"
        `);
  }
}
