import { AlterStatusWhUseCase } from "./AlterStatusWhUseCase";
import { Request, Response } from "express";
import {z} from "zod"
import { AlterStatusWhInputDTO } from "./AlterStatusWhDTO";

export class AlterStatusWhController {
    constructor(
        private alterstatuswhusecase:AlterStatusWhUseCase
    ){}

    private AlterStatusWhInputSchema = z.object({
        id:z.number(),
        status:z.number()
    })

    async handle(request:Request, response:Response) : Promise<Response> {
        try {
            const {id:idUser} = request.body.infUser
            const validBody = this.AlterStatusWhInputSchema.safeParse(request.body);
            if (!validBody.success) {
                return response.status(400).json({
                    message: "Dados inválidos",
                    errors: validBody.error.errors,
                  });
            } 
            const {id, status} = validBody.data
            const data:AlterStatusWhInputDTO = {
                input : {
                    idUser,
                    id,
                    status
                }
            }
            const output = await this.alterstatuswhusecase.execute(data)
            return response.status(200).json({
                status:200,
                message:output.output
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