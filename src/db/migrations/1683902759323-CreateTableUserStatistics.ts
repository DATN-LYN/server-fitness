import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUserStatistics1683902759323 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "user_statistics" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "user_id" uuid NULL,
                "program_count" int NULL,
                "calo_count" float NULL,
                "duration_count" int NULL,
                "gender" VARCHAR NULL,
        
                "created_at" timestamp with time zone DEFAULT NOW(),
                "updated_at" timestamp with time zone DEFAULT NOW(),
        
                CONSTRAINT "PK_UserStatistics" PRIMARY KEY ("id"),
                CONSTRAINT "FK_UserStatistics_User" FOREIGN KEY ("user_id") REFERENCES "user" ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS "user_statistics"
        `);
    }

}
