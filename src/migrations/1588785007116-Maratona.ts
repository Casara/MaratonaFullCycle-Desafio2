import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Maratona1588785007116 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'maratona',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'uuid'
        },
        {
          name: 'aula',
          type: 'varchar',
          charset: 'utf-8',
          isNullable: false,
          isUnique: true
        }
      ]
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('maratona');
  }

}
