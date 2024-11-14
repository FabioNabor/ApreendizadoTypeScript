import { MigrationInterface, QueryRunner } from "typeorm";

export class DefaultPermission1730823420132 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
                INSERT INTO "permissions" ("id", "permissionModulo", "permissionName", "permissionDescricao") VALUES
                (2, 'Admin', 'Create User', 'Permission for create new users'),
                (1, 'Admin', 'Liberation Permission', 'Permission for release permissions to the users'),
                (3, 'User', 'Create Demand', 'Permission for create demand'),
                (4, 'User', 'Delete Demand', 'Permission for delete demand'),
                (5, 'User', 'Alter Password', 'Permission for alter password'),
                (6, 'WebHook', 'Alter Status Demand', 'Permission for alter status demand'),
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
