import { UsuarioInputDTO, UsuarioOutputDTO } from "../../../usecase/usuario/usuario-create-login/CreateUserDTO";
import { iUsuarioRepository } from "../iUsuarioRepository";
import { AppDataSource } from "../../../database/dataSource";
import { Repository } from "typeorm";
import { User } from "../../../database/entities/Usuario";

export class Postgres implements iUsuarioRepository {

    constructor(
        private repositoryUser:Repository<User>
    ){}

    async create(userInput: UsuarioInputDTO): Promise<UsuarioOutputDTO> {
        const user = new User();
        user.userName = userInput.user.name
        user.userLogin = userInput.user.login
        user.userSetor = userInput.user.sector
        user.userEmail = userInput.user.email
        user.userPassword = userInput.user.password
        const save:User = await this.repositoryUser.save(user)
        return {
            user : {
                id:save.id,
                name:save.userName,
                login:save.userLogin
            }
        }
    }
    async find(login: string): Promise<UsuarioOutputDTO | null> {
        const user = await this.repositoryUser.findOneBy({
            userName:login
        })
        if (!user) {
            return user
        }
        return {
            user : {
                id:user.id,
                name:user.userName,
                login:user.userLogin
            }
        }
    }

}