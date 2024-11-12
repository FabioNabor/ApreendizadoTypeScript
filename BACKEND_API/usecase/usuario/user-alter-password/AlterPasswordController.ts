import { AlterPasswordInputDtO } from "./AlterPasswordDTO";
import { AlterPasswordUseCase } from "./AlterPasswordUseCase";
import { Request, Response } from "express";
import {z} from "zod"

export class AlterPasswordController {
    constructor(
        private alterPasswordUseCase:AlterPasswordUseCase
    ){}

    private AlterPasswordInputSchema = z.object({
        login:z.string().nonempty("Login é obrigatório.").min(8, "Mínimo de 8 caracters para o login."),
        oldPassword:z.string().nonempty("Informe a senha antiga").min(8, "O tamanho minímo da senha é de 8 caractes"),
        newPassword:z.string().nonempty("Informe a nova senha").min(8, "O tamanho minímo da senha é de 8 caractes")
    })

    async handle(request:Request, response:Response) : Promise<Response> {
        try {
            const validBody = this.AlterPasswordInputSchema.safeParse(request.body);
            if (!validBody.success) {
                return response.status(400).json({
                    message: "Dados inválidos",
                    errors: validBody.error.errors,
                  });
            } 
            const {login, oldPassword, newPassword} = validBody.data
            const data:AlterPasswordInputDtO = {
                alterInput : {
                    login,
                    oldPassword,
                    newPassword
                }
            }
            const alter = await this.alterPasswordUseCase.execute(data)
            return response.status(200).json({
                status:200,
                message:alter.alterOutput
            })
        } catch (err) {
            if (err instanceof Error) {
                return response.status(400).json({
                    status:400,
                    message: err.message
                });
            } else {
                return response.status(404).json({
                    status:404,
                    message: "Erro inesperado!"
                });
            }
        }
    }
}