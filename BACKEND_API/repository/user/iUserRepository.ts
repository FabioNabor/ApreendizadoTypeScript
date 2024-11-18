import { CreateUserOutputDTO,CreateUserInputDTO } from "../../usecase/user/user-create-login/CreateUserDTO";
import { AlterPasswordInputDtO, AlterPasswordOutputDtO } from "../../usecase/user/user-alter-password/AlterPasswordDTO";


export interface iUserRepository {
    create(userInput:CreateUserInputDTO):Promise<CreateUserOutputDTO>
    alterPassword(alterInput:AlterPasswordInputDtO):Promise<AlterPasswordOutputDtO>
    find(id:string):Promise<CreateUserOutputDTO | null>
    findLogin(login:string):Promise<CreateUserOutputDTO | null>
    findCredentials(login:string):Promise<{id:string, name:string, email:string, password:string}>
    listPermissions(id:string):Promise<number[]>
}