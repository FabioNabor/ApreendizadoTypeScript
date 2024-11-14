export interface CreateUserInputDTO {
    input: {
        name:string
        email:string
        login:string
        sector:string
        password:string
    }
}
export interface CreateUserOutputDTO {
    output: {
        id:string
        name:string
        login:string
    }
}