import {MigrationInterface, QueryRunner} from "typeorm";

export class migration31630946502919 implements MigrationInterface {
    name = 'migration31630946502919'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`test\`.\`user\` DROP COLUMN \`token\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user\` ADD \`token\` longtext NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`test\`.\`user\` DROP COLUMN \`token\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user\` ADD \`token\` varchar(255) NOT NULL`);
    }

}
