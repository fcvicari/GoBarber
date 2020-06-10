import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateServicesByProvider1591565886719
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'services',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'provider_id',
            type: 'uuid',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'value',
            type: 'numeric',
            precision: 10,
            scale: 2,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'Now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'Now()',
          },
        ],
        foreignKeys: [
          {
            name: 'ProviderIDToService',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['provider_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('services');
  }
}
