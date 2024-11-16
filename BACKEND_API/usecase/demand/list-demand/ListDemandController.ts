import { ListDemandUseCase } from "./ListDemandUseCase";
import { Request, Response } from "express";

export class ListDemandController {
    constructor (
        private listDemandUseCase:ListDemandUseCase
    ){}

    async handle(request:Request, response:Response) : Promise<Response> {
        try {
            const {id} = request.body.infUser
            const demands = await this.listDemandUseCase.execute(id)
            return response.status(200).json({
                status:200,
                demands:demands
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