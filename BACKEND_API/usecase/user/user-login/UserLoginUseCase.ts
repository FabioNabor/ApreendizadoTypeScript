import { UseCase } from "../../UseCase";
import { UserLoignInputDTO, UserLoignOutputDTO } from "../../../DTOs/user/UserLoginDTO";
import { authService } from "../../../services/authService";
import { compare } from "bcrypt";
import { iUserRepository } from "../../../repository/user/iUserRepository";

export class UserLoginUseCase
    implements UseCase<UserLoignInputDTO, UserLoignOutputDTO> {
    
    private constructor(
        private userRepository:iUserRepository
    ) {}

    public static create(userRepository:iUserRepository){
        return new UserLoginUseCase(userRepository)
    }

    async execute(data: UserLoignInputDTO): Promise<UserLoignOutputDTO> {
        const credentials = await this.userRepository.findByLogin(data.input.login);
        if (!credentials) throw new Error("Usuário não encontrado!");
        if (credentials?.userEmail !== data.input.email) throw new Error("Credenciais incorretas!");
        const permissions = await this.userRepository.listPermissions(credentials.id) || []
        const comparePassword = compare(data.input.password, credentials.userPassword)
        if (!comparePassword) throw new Error("Senha inválida!");
        const token = await authService.genToken({
            id:credentials.id,
            login:data.input.login,
            name:credentials.userName,
            permissions:permissions
        })
        const output:UserLoignOutputDTO = {
            output : {
                login:data.input.login,
                name:credentials.userName,
                token:token
            }
        }
        return output
    }

}