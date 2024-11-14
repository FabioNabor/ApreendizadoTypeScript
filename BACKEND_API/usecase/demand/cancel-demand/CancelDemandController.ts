import { z } from "zod";
import { Request, Response } from "express";
import { CancelDemandUseCase } from "./CancelDemandUseCase";
import { CancelDemandInputDTO } from "./CancelDemandDTO";

export class CancelDemandController {
    constructor(
        private cancelDemandUseCase:CancelDemandUseCase
    ){}
    private DeleteDemandInputSchema = z.object({
        demandId:z.number()
    })
    async handle(request:Request, response:Response) : Promise<Response> {
        try {
            const {id} = request.body.infUser
            const validBody = this.DeleteDemandInputSchema.safeParse(request.body);
            if (!validBody.success) {
                return response.status(400).json({
                    message: "Dados inválidos",
                    errors: validBody.error.errors,
                    });
            } 
            const {demandId} = validBody.data
            const demandInput:CancelDemandInputDTO = {
                input:{
                    id,
                    demandId
                }
            }
            const output = await this.cancelDemandUseCase.execute(demandInput)
            return response.status(200).json({
                status:200,
                result:output.output
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