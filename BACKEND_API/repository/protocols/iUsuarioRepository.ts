import { userPermission } from "../../database/entities/eUsuariosPermission"
import { Demandas } from "../../database/entities/eDemands"

export default interface iUsuarioRepository<T> {
    listarDemandas(uuid:string):Promise<Demandas[]>;
    excluirDemandas(uuid:string):Promise<boolean>;
    listarPermissions(uuid:string):Promise<userPermission[]>
    alterarSenha(uuid:string, firstPassoword:string, novaPassword:string):Promise<boolean>;
}