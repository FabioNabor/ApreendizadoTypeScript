import { iUserRepository } from "../../../repository/user/iUserRepository";
import { UseCase } from "../../UseCase";
import { AlterPasswordInputDtO, AlterPasswordOutputDtO } from "../../../DTOs/user/AlterPasswordDTO";
import { compare } from "bcrypt";

export class AlterPasswordUseCase 
    implements UseCase<AlterPasswordInputDtO, AlterPasswordOutputDtO>{
    private constructor(
        private userRepository:iUserRepository
    ){}

    public static create(userRepository:iUserRepository){
        return new AlterPasswordUseCase(userRepository)
    }

    async execute(data:AlterPasswordInputDtO):Promise<AlterPasswordOutputDtO> {
        const user = await this.userRepository.findByID(data.input.id)
        if (!user) throw new Error("Usuário não foi encontrado!");
        const liken = await compare(data.input.oldPassword, user.userPassword);
        if (!liken) throw new Error("Senha incorreta!")
        const isEqual = await compare(data.input.newPassword, user.userPassword);
        if (isEqual) throw new Error("Informe uma senha diferente da atual para alteração!")
        const alterOutput = await this.userRepository
                .alterPassword(user, data.input.newPassword)
        const output:AlterPasswordOutputDtO = {
            output:{
                sucess:alterOutput
            }
        }
        return output
    }
}