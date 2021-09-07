import {MigrationInterface, QueryRunner} from "typeorm";

export class migration21630939306758 implements MigrationInterface {
    name = 'migration21630939306758'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`test\`.\`user\` ADD \`token\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`test\`.\`user\` DROP COLUMN \`token\``);
    }

}
