import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCategory1681382866554 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "category" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" VARCHAR(255) NOT NULL,
                "img_url" VARCHAR(2048) NULL,
                "created_at" timestamp with time zone DEFAULT NOW(),
                "updated_at" timestamp with time zone DEFAULT NOW(),
    
                CONSTRAINT "PK_Category" PRIMARY KEY ("id"),
                CONSTRAINT "UQ_Category_Name" UNIQUE ("name")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE IF EXISTS "category"
        `);
  }
}
