import { CreateUserUseCase } from "./CreateUserUseCase";
import { Request, Response } from "express";
import { UsuarioInputDTO } from "./CreateUserDTO";

export class CreateUserController {
    constructor(
        private createUseCase:CreateUserUseCase
    ){}

    async handle(request:Request, response:Response) : Promise<Response> {
        const {name, email, login, sector, password} = request.body
        try { 
            const userInput:UsuarioInputDTO = {
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
        } catch (err: unknown) {
            if (err instanceof Error) {
                return response.status(400).json({
                    message: err.message
                });
            } else {
                return response.status(400).json({
                    message: "Erro inesperado!"
                });
            }
        }
    }
}