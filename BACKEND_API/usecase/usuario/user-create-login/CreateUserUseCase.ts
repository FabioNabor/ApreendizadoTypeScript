import { User } from "../../../database/entities/Usuario";
import { iCreateUserRepository } from "../../../repository/User/iCreateUserRepository";
import { CreateUserInputDTO, CreateUserOutputDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
    constructor(
        private iCreateUserRepository:iCreateUserRepository
    ) {}
    async execute(data:CreateUserInputDTO):Promise<CreateUserOutputDTO> {
        const userExists = await this.iCreateUserRepository.find(data.user.login)
        console.log(userExists)
        if (userExists) {
            throw new Error("Já existe um usuário com esse login cadastrado.")
        }
        const user:CreateUserOutputDTO = await this.iCreateUserRepository.create(data)
        return user
    }
}