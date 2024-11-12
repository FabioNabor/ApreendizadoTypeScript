export interface UsuarioInputDTO {
    user: {
        name:string
        email:string
        login:string
        sector:string
        password:string
    }
}
export interface UsuarioOutputDTO {
    user: {
        id:string
        name:string
        login:string
    }
}