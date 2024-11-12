import { UsuarioOutputDTO,UsuarioInputDTO } from "../../usecase/usuario/usuario-create-login/CreateUserDTO";

export interface iUsuarioRepository {
    create(userInput:UsuarioInputDTO):Promise<UsuarioOutputDTO>
    find(login:string):Promise<UsuarioOutputDTO | null>
}