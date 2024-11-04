import { Response, Request } from "express";
import iUsuario from "../repository/protocols/iUsuario";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import iAlterPassword from "../repository/protocols/iAlterPassword";

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
        const criacao = await usuariorepository.criarUsuario(body);
        delete (criacao as { userPassword?: string }).userPassword;
        resp.status(200).json({
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

export const alterPassword = async (req:Request, resp:Response) => {
    try {
        if (!req.body.alterpassword) {
            resp.status(400).json({
                status:400,
                message:"{alterpassword} não está presente no body."
            })
            return;
        }
        const body:iAlterPassword = req.body.alterpassword
        const alter = await usuariorepository.alterarSenha(body)
        resp.status(201).json({
            status:201,
            alterado:alter,
            message: "Alteração realizada com sucesso!"
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

