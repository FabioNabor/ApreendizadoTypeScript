export interface UserLoignInputDTO {
    input : {
        login:string
        email:string
        password:string
    }
}

export interface UserLoignOutputDTO {
    output : {
        login:string
        name:string
        token:string
    }
}