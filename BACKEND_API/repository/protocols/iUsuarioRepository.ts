import { Response } from "express"
import iUsuario from "./iUsuario"

export default interface iUsuarioRepository {
    criarUsuario(novoUsuario:iUsuario):Promise<Response>
    listarDemandas(uuid:string):Promise<Response>
    listarPermissions(uuid:string):Promise<Response>
    listarUsuarios(uuid:string):Promise<Response>
    alterarSenha(uuid:string, firstPassoword:string, novaPassword:string):Promise<Response>
}