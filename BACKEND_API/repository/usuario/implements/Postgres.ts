import { CreateUserInputDTO, CreateUserOutputDTO } from "../../../usecase/usuario/user-create-login/CreateUserDTO";
import { compare } from "bcrypt";
import { Repository } from "typeorm";
import { User } from "../../../database/entities/Usuario";
import { iCreateUserRepository } from "../../User/iCreateUserRepository";
import { iAlterPasswordRepository } from "../../User/iAlterPasswordRepository";
import { AlterPasswordInputDtO, AlterPasswordOutputDtO } from "../../../usecase/usuario/user-alter-password/AlterPasswordDTO";

export class Postgres implements iCreateUserRepository, iAlterPasswordRepository {

    constructor(
        private repositoryUser:Repository<User>
    ){}
    
    async create(userInput: CreateUserInputDTO): Promise<CreateUserOutputDTO> {
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
    async find(login: string): Promise<CreateUserOutputDTO | null> {
        const user = await this.repositoryUser.findOneBy({
            userLogin:login
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
    
    async alterPassword(alterInput: AlterPasswordInputDtO): Promise<AlterPasswordOutputDtO> {
        const user = await this.repositoryUser.findOneBy({
            userLogin:alterInput.alterInput.login
        })
        if (!user) throw new Error("Usuário não encontrado!");
        const check = await compare(alterInput.alterInput.oldPassword, user.userPassword) 
        if (!check) throw new Error("Senha inválida");
        const isNew = await compare(alterInput.alterInput.newPassword, user.userPassword) 
        if (isNew) throw new Error("Informe uma senha diferente da atual!");
        user.userPassword = alterInput.alterInput.newPassword
        await user.save()
        const alterOutput:AlterPasswordOutputDtO = {
            alterOutput:{
                login:user.userLogin,
                message:"Senha Alterada com sucesso!"
            }
        }
        return alterOutput
    }
}