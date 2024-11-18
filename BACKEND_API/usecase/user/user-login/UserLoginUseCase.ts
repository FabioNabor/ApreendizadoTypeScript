import { UseCase } from "../../UseCase";
import { UserLoignInputDTO, UserLoignOutputDTO } from "./UserLoginDTO";
import { authService } from "../../../services/authService";
import { compare } from "bcrypt";
import { iUserRepository } from "../../../repository/user/iUserRepository";

export class UserLoginUseCase
    implements UseCase<UserLoignInputDTO, UserLoignOutputDTO> {
    
    constructor(
        private userRepository:iUserRepository
    ){}

    async execute(data: UserLoignInputDTO): Promise<UserLoignOutputDTO> {
        const credentials = await this.userRepository.findCredentials(data.input.login);
        if (credentials.email !== data.input.email) throw new Error("Credenciais incorretas!");
        const permissions = await this.userRepository.listPermissions(credentials.id)
        const comparePassword = compare(data.input.password, credentials.password)
        if (!comparePassword) throw new Error("Senha inválida!");
        const token = await authService.genToken({
            id:credentials.id,
            login:data.input.login,
            name:credentials.name,
            permissions:permissions
        })
        const output:UserLoignOutputDTO = {
            output : {
                login:data.input.login,
                name:credentials.name,
                token:token
            }
        }
        return output
    }

}