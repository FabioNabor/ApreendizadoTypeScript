import { User } from "../../../database/entities/RegisterUser";
import { iUserRepository } from "../../../repository/user/iUserRepository";
import { UseCase } from "../../UseCase";
import { CreateUserInputDTO, CreateUserOutputDTO } from "../../../DTOs/user/CreateUserDTO";

export class CreateUserUseCase 
    implements UseCase<CreateUserInputDTO, CreateUserOutputDTO>{
    private constructor(
        private userRepository:iUserRepository
    ) {}

    public static create(userRepository:iUserRepository){
        return new CreateUserUseCase(userRepository)
    }

    async execute(data:CreateUserInputDTO):Promise<CreateUserOutputDTO> {
        console.log("finalizado!")
        const isUser = await this.userRepository.findByLogin(data.input.login);
        if (isUser) throw new Error("Já existe um usuário com esse login cadastrado.");
        const newUser = new User({
            userName:data.input.name,
            userEmail:data.input.email,
            userLogin:data.input.login,
            userSetor:data.input.sector,
            userPassword:data.input.password
        });
        const user = await this.userRepository.create(newUser);
        const output:CreateUserOutputDTO = {
            output:{
                name:user.userName,
                login:user.userLogin
            }
        }
        console.log("finalizado!")
        return output
    }
}