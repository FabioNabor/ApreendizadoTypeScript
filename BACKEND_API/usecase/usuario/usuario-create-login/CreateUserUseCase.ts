import { User } from "../../../database/entities/Usuario";
import { iUsuarioRepository } from "../../../repository/usuario/iUsuarioRepository";
import { UsuarioInputDTO, UsuarioOutputDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
    constructor(
        private iUsuarioRep:iUsuarioRepository
    ) {}
    async execute(data:UsuarioInputDTO):Promise<UsuarioOutputDTO> {
        const userExists = await this.iUsuarioRep.find(data.user.login)
        if (userExists == null) {
            throw new Error("Já existe um usuário com esse login cadastrado.")
        }
        const user:UsuarioOutputDTO = await this.iUsuarioRep.create(data)
        return user
    }
}