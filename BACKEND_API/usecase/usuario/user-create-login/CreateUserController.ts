import { CreateUserUseCase } from "./CreateUserUseCase";
import { Request, Response } from "express";
import { CreateUserInputDTO } from "./CreateUserDTO";
import {z} from "zod"

export class CreateUserController {
    constructor(
        private createUseCase:CreateUserUseCase
    ){}

    private CreateUserInputSchema = z.object({
        name:z.string().nonempty("Nome do novo usuário é obrigatório!"),
        email:z.string().nonempty("E-mail é obrigatório!").email("E-mail inválido."),
        login:z.string().nonempty("Login é obrigatório.").min(8, "Mínimo de 15 caracters para o login."),
        sector:z.string().nonempty("Setor é obrigatório."),
        password:z.string().nonempty("Senha é obrigatório").min(8, "Mínimo de 8 caracters para a senha!.")
    })

    async handle(request:Request, response:Response) : Promise<Response> {
        try { 
            const validBody = this.CreateUserInputSchema.safeParse(request.body);
            if (!validBody.success) {
                return response.status(400).json({
                    message: "Dados inválidos",
                    errors: validBody.error.errors,
                  });
            } 
            const {name, email, login, sector, password} = validBody.data
            const userInput:CreateUserInputDTO = {
                user:{
                    name,
                    email,
                    login,
                    sector,
                    password
                }
            }
            const user = await this.createUseCase.execute(userInput);
            return response.status(201).json(user);
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