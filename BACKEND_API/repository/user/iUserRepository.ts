import { CreateUserOutputDTO,CreateUserInputDTO } from "../../usecase/usuario/user-create-login/CreateUserDTO";
import { AlterPasswordInputDtO, AlterPasswordOutputDtO } from "../../usecase/usuario/user-alter-password/AlterPasswordDTO";


export interface iUserRepository {
    create(userInput:CreateUserInputDTO):Promise<CreateUserOutputDTO>
    alterPassword(alterInput:AlterPasswordInputDtO):Promise<AlterPasswordOutputDtO>
    find(login:string):Promise<CreateUserOutputDTO | null>
}