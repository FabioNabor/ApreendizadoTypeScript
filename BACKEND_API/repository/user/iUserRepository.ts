import { CreateUserOutputDTO,CreateUserInputDTO } from "../../DTOs/user/CreateUserDTO";
import { AlterPasswordInputDtO, AlterPasswordOutputDtO } from "../../DTOs/user/AlterPasswordDTO";
import { User } from "../../database/entities/RegisterUser";


export interface iUserRepository {
    create(user:User):Promise<User>
    alterPassword(user: User, newPassword:string):Promise<boolean>
    findByID(id:string):Promise<User | null>
    findByLogin(login:string):Promise<User | null>
    listPermissions(id:string):Promise<number[] | undefined>
}