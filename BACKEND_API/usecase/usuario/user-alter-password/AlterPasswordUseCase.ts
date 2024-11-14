import { iUserRepository } from "../../../repository/user/iUserRepository";
import { UseCase } from "../../UseCase";
import { AlterPasswordInputDtO, AlterPasswordOutputDtO } from "./AlterPasswordDTO";

export class AlterPasswordUseCase 
    implements UseCase<AlterPasswordInputDtO, AlterPasswordOutputDtO>{
    constructor(
        private iUserRepository:iUserRepository
    ){}

    async execute(data:AlterPasswordInputDtO):Promise<AlterPasswordOutputDtO> {
        const alterOutput:AlterPasswordOutputDtO = await this.iUserRepository
                .alterPassword(data)
        return alterOutput
    }
}