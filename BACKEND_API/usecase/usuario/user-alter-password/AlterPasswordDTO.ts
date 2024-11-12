export interface AlterPasswordInputDtO {
    alterInput : {
        login:string
        oldPassword:string
        newPassword:string
    }
}

export interface AlterPasswordOutputDtO {
    alterOutput : {
        login:string
        message:string
    }
}