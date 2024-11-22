export interface CreateUserInputDTO {
    input: {
        id:string
        name:string
        email:string
        login:string
        sector:string
        password:string
    }
}
export interface CreateUserOutputDTO {
    output: {
        name:string
        login:string
    }
}