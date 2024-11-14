export interface AlterPasswordInputDtO {
    input : {
        id:string
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