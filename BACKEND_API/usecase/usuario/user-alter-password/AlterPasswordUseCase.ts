import { iAlterPasswordRepository } from "../../../repository/User/iAlterPasswordRepository";
import { AlterPasswordInputDtO, AlterPasswordOutputDtO } from "./AlterPasswordDTO";
import {z} from "zod"

export class AlterPasswordUseCase {
    constructor(
        private alterPasswordRepository:iAlterPasswordRepository
    ){}

    async execute(data:AlterPasswordInputDtO) {
        const alterOutput:AlterPasswordOutputDtO = await this.alterPasswordRepository
                .alterPassword(data)
        return alterOutput
    }
}