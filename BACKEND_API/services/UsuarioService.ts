
import { User } from '../database/entities/Usuario';
import { AppDataSource } from '../database/dataSource';
import iContainsCheckPermision from '../repository/protocols/iPermissionCheck';

export class UserService {
    async containsPermission(permcheck:iContainsCheckPermision): Promise<void> {
        const {uuid, idpermission} = permcheck
        const useconn = AppDataSource.getRepository(User);

        // Buscar o usuário e suas permissões
        const user = await useconn.findOne({
            where: {id:uuid},
            relations:["usuariosPermission"]
        })

        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        const perm = user.usuariosPermission.some(permission => permission.id === idpermission);

        if (!perm) throw new Error("Você não possui permissão para executar está demanda!");
    }
}
