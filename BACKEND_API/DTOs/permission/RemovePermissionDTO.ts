export interface RemovePermissionInputDTO {
    input : {
        login:string
        id:number
    }
}

export interface RemovePermissionOutputDTO {
    output : {
        sucess:boolean
    }
}