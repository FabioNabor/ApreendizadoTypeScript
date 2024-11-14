export interface AlterPasswordInputDtO {
    input : {
        login:string
        oldPassword:string
        newPassword:string
    }
}

export interface AlterPasswordOutputDtO {
    output : {
        login:string
        message:string
    }
}