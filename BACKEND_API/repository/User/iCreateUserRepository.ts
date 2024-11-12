import { AlterPasswordInputDtO, AlterPasswordOutputDtO } from "../../usecase/usuario/user-alter-password/AlterPasswordDTO";
import { CreateUserOutputDTO,CreateUserInputDTO } from "../../usecase/usuario/user-create-login/CreateUserDTO";

export interface iCreateUserRepository {
    create(userInput:CreateUserInputDTO):Promise<CreateUserOutputDTO>
    find(login:string):Promise<CreateUserOutputDTO | null>
}