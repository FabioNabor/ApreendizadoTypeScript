import { AlterPasswordInputDtO, AlterPasswordOutputDtO } from "../../usecase/usuario/user-alter-password/AlterPasswordDTO";

export interface iAlterPasswordRepository {
    alterPassword(alterInput:AlterPasswordInputDtO):Promise<AlterPasswordOutputDtO>
}