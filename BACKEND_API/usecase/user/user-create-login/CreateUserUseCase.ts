import { User } from "../../../database/entities/RegisterUser";
import { iUserRepository } from "../../../repository/user/iUserRepository";
import { UseCase } from "../../UseCase";
import { CreateUserInputDTO, CreateUserOutputDTO } from "./CreateUserDTO";

export class CreateUserUseCase 
    implements UseCase<CreateUserInputDTO, CreateUserOutputDTO>{
    constructor(
        private userRepository:iUserRepository
    ) {}
    async execute(data:CreateUserInputDTO):Promise<CreateUserOutputDTO> {
        const userExists = await this.userRepository.find(data.input.login)
        console.log(userExists)
        if (userExists) throw new Error("Já existe um usuário com esse login cadastrado.");
        const user:CreateUserOutputDTO = await this.userRepository.create(data)
        return user
    }
}