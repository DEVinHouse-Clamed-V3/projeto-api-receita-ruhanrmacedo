import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterPreparationTimeToDecimal1739685342947
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "recipes",
      "preparation_time",
      new TableColumn({
        name: "preparation_time",
        type: "decimal",
        precision: 5,
        scale: 2,
        isNullable: true,
      })
    );

    await queryRunner.query(
      `UPDATE recipes SET preparation_time = 10 WHERE preparation_time IS NULL`
    );

    await queryRunner.changeColumn(
      "recipes",
      "preparation_time",
      new TableColumn({
        name: "preparation_time",
        type: "decimal",
        precision: 5,
        scale: 2,
        isNullable: false, 
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "recipes",
      "preparation_time",
      new TableColumn({
        name: "preparation_time",
        type: "time",
        isNullable: false,
      })
    );
  }
}
