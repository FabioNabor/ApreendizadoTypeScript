import { User } from "../../database/entities/RegisterUser"

export interface AlterPasswordInputDtO {
    input : {
        id:string
        oldPassword:string
        newPassword:string
    }
}

export interface AlterPasswordOutputDtO {
    output : {
        sucess:boolean
    }
}