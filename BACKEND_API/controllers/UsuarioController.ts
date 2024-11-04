import { Response, Request } from "express";
import iUsuario from "../repository/protocols/iUsuario";
import { UsuarioRepository } from "../repository/UsuarioRepository";

const usuariorepository = new UsuarioRepository()

export const createNewUser = async (req:Request, resp:Response) => {
    try {
        if (!req.body.usuario) {
            resp.status(400).json({
                status:400,
                message:"{usuario} não está presente no body."
            })
            return;
        }
        const body:iUsuario = req.body.usuario
        const criacao = await usuariorepository.criarUsuario(body)
        resp.status(400).json({
            status:200,
            message: "Usuário criado com sucesso!",
            usuario:criacao
        })
        return;
    } catch (error) {
        console.log(error)
        resp.status(500).json({
            status:500,
            message: "" + error
        })
    }

}

