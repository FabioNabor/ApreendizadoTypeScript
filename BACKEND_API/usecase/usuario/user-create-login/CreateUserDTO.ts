export interface CreateUserInputDTO {
    user: {
        name:string
        email:string
        login:string
        sector:string
        password:string
    }
}
export interface CreateUserOutputDTO {
    user: {
        id:string
        name:string
        login:string
    }
}