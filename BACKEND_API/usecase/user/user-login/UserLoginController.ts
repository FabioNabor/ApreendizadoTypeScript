import { z } from "zod";
import { Request, Response } from "express";
import { UserLoginUseCase } from "./UserLoginUseCase";
import { UserLoignInputDTO, UserLoignOutputDTO } from "./UserLoginDTO";

export class UserLoginController {
    constructor(
        private userLoginUseCase:UserLoginUseCase
    ){}
    private UserLoginInputSchema = z.object({
        email:z.string().nonempty("E-mail é obrigatório!").email("E-mail inválido."),
        login:z.string().nonempty("Login é obrigatório.").min(8, "Mínimo de 8 caracters para o login."),
        password:z.string().nonempty("Senha é obrigatório").min(8, "Mínimo de 8 caracters para a senha!.")
    })

    async handle(request:Request, response:Response) : Promise<Response> {
        try {
            const validBody = this.UserLoginInputSchema.safeParse(request.body);
            if (!validBody.success) {
                return response.status(400).json({
                    message: "Dados inválidos",
                    errors: validBody.error.errors,
                  });
            } 
            const {email, login, password} = validBody.data
            const input:UserLoignInputDTO = {
                input : {
                    login,
                    email,
                    password
                }
            }
            const output:UserLoignOutputDTO = await this.userLoginUseCase.execute(input)
            return response.status(200).json({
                status:200,
                output
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