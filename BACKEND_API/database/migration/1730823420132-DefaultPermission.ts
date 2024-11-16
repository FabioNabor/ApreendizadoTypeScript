import { MigrationInterface, QueryRunner } from "typeorm";
import { User } from "../entities/RegisterUser";
import { userPermission } from "../entities/UserPermission";

export class DefaultPermission1730823420132 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
                INSERT INTO "permissions" ("id", "permissionModule", "permissionName", "permissionDescription") VALUES
                (2, 'Admin', 'Create User', 'Permission for create new users'),
                (1, 'Admin', 'Liberation Permission', 'Permission for release permissions to the users'),
                (3, 'User', 'Create Demand', 'Permission for create demand'),
                (4, 'User', 'Delete Demand', 'Permission for delete demand'),
                (5, 'User', 'Alter Password', 'Permission for alter password'),
                (6, 'WebHook', 'Alter Status Demand', 'Permission for alter status demand')
            `)
        const adm = new User()
        adm.userName = "admin"
        adm.userEmail = "admin.geral@gen.com.br"
        adm.userLogin = "admin.adm"
        adm.userSetor = "Geral"
        adm.userPassword = "admin.adm"
        const saveadm = await queryRunner.manager.save(adm);
        await queryRunner.query(`
                INSERT INTO "userPermissions" ("permissionId", "userId") VALUES
                (1,'${saveadm.id}'),
                (2,'${saveadm.id}'),
                (3,'${saveadm.id}'),
                (4,'${saveadm.id}'),
                (5,'${saveadm.id}'),
                (6,'${saveadm.id}')
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remover permissões do usuário administrador
        await queryRunner.query(`DELETE FROM "userPermissions" WHERE "userId" = (SELECT "id" FROM "users" WHERE "userLogin" = 'admin.adm')`);

        // Remover usuário administrador
        await queryRunner.query(`DELETE FROM "users" WHERE "userLogin" = 'admin.adm'`);

        // Remover permissões
        await queryRunner.query(`DELETE FROM "permissions" WHERE "id" IN (1, 2, 3, 4, 5, 6)`);
    }

}
