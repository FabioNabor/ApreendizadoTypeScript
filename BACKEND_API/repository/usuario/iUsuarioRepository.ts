import { UsuarioOutputDTO,UsuarioInputDTO } from "../../usecase/usuario/usuario-create-login/UsuarioDTO";

export interface iUsuarioRepository {
    create(userInput:UsuarioInputDTO):Promise<UsuarioOutputDTO>
    find(login:string):Promise<UsuarioOutputDTO>
}