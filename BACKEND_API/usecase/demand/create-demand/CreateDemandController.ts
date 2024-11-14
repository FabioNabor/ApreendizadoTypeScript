import {z} from "zod"
import { Request, Response } from "express";
import { CreateDemandUseCase } from "./CreateDemandUseCase";
import { CreateDemandInputDTO, CreateDemandOutputDTO } from "./CreateDemandDTO";

export class CreateDemandController {
    constructor(
        private createDemandUseCase:CreateDemandUseCase
    ){}

    private CreateDemandInputSchema = z.object({
        login:z.string().nonempty("Informe o login do usuário que deseja criar a demanda."),
        name:z.string().nonempty("Nome é obrigatório!").min(10, "Mínimo de 10 caracters para o nome.")
            .max(100, "Máximo de 100 caracters"),
        description:z.string().nonempty("Descrição é obrigatório.").min(30, "Mínimo de 30 caracters para a descrição.")
            .max(150, "Máximo de 150 caracters"),
    })

    async handle(request:Request, response:Response) : Promise<Response> {
        try {
            const validBody = this.CreateDemandInputSchema.safeParse(request.body);
            if (!validBody.success) {
                return response.status(400).json({
                    message: "Dados inválidos",
                    errors: validBody.error.errors,
                  });
            } 
            const {login, name, description} = validBody.data
            const demandInput:CreateDemandInputDTO = {
                input:{
                    login,
                    name,
                    description
                }
            }
            const create:CreateDemandOutputDTO = await this.createDemandUseCase.execute(demandInput)
            return response.status(201).json({
                status:201,
                demandInf:create.output
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