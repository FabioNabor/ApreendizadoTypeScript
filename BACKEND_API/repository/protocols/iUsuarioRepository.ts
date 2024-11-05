import { userPermission } from "../../database/entities/UsuariosPermission"
import { Demandas } from "../../database/entities/Demands"
import iUsuario from "./iUsuario";
import { iDemand, iDeleteDemand } from "./iDemand";
import { User } from "../../database/entities/Usuario";
import iAlterPassword from "./iAlterPassword";

export default interface iUsuarioRepository {
    criarUsuario(novoUser:iUsuario): Promise<User>
    criarDemand(novoUser:iDemand): Promise<Demandas>
    excluirDemandas(deldemand:iDeleteDemand):Promise<boolean>;
    listarDemandas(uuid:string):Promise<Demandas[]>;
    listarPermissions(uuid:string):Promise<userPermission[]>;
    alterarSenha(alterpassword:iAlterPassword):Promise<boolean>;
}