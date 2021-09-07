import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration11630890245898 implements MigrationInterface {
  name = 'migration11630890245898';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`test\`.\`user\` (\`id\` char(36) NOT NULL, \`first_name\` varchar(128) NOT NULL, \`last_name\` varchar(128) NOT NULL, \`email\` varchar(64) NOT NULL, \`password\` varchar(255) NOT NULL, \`age\` smallint NOT NULL, \`image\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`test\`.\`user\``);
  }
}
