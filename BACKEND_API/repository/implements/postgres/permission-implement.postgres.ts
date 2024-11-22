import { Repository } from "typeorm";
import { User } from "../../../database/entities/RegisterUser";
import { Permission } from "../../../database/entities/Permission";
import { userPermission } from "../../../database/entities/UserPermission";
import { iPermissionRepository } from "../../permission/iPermissionRepository";

export class PostgresPermissionRepository implements iPermissionRepository {

    private constructor(
        private permissionsRepository:Repository<Permission>,
        private userPermissionsRepository:Repository<userPermission>
    ){}
    public static create(permissionsRepository:Repository<Permission>, userPermissionsRepository:Repository<userPermission>) {
        return new PostgresPermissionRepository(permissionsRepository, userPermissionsRepository)
    }

    async findByID(id: number): Promise<Permission | null> {
        const perm = await this.permissionsRepository.findOneBy({
            id
        })
        return perm
    }

    async libery(user: User, permission: Permission): Promise<boolean> {
        const perm = await this.userPermissionsRepository.create({
            permission,
            user
        })
        const save = await this.userPermissionsRepository.save(perm)
        return !!save
    }
    async remove(user: User, permission: Permission): Promise<boolean> {
        const perm = await this.userPermissionsRepository.findOneBy({
            user,
            permission
        })
        if (!perm) return false;
        await this.userPermissionsRepository.remove(perm)
        return true
    }

    

}