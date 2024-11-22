import { Permission } from "../../database/entities/Permission";
import { User } from "../../database/entities/RegisterUser";
import { userPermission } from "../../database/entities/UserPermission";

export interface iPermissionRepository {
    findByID(id:number):Promise<Permission | null>
    libery(user:User, permission:Permission):Promise<boolean>
    remove(user:User, permission:Permission):Promise<boolean>
    // list(user:User):Promise<userPermission>
}