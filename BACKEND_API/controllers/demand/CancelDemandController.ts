import { z } from "zod";
import { Request, Response } from "express";
import { CancelDemandUseCase } from "../../usecase/demand/cancel-demand/CancelDemandUseCase";
import { CancelDemandInputDTO } from "../../DTOs/demand/CancelDemandDTO";
import { BaseControllerService, HttpMethod, RouteConstructor } from "../route";

export class CancelDemandController extends BaseControllerService{

    private constructor (data:RouteConstructor){super(data)}

    public static create(service:CancelDemandUseCase) {
        return new CancelDemandController({
            path:"/cancel-demand",
            method:HttpMethod.DELETE,
            service:service,
            auth:true,
        })
    }

    private DeleteDemandInputSchema = z.object({
        demandId:z.number()
    })

    public getHandler() {
        return async (request: Request, response: Response) : Promise<void> => {
            try {
                const {id} = request.body.infUser
                const validBody = this.DeleteDemandInputSchema.safeParse(request.body);
                if (!validBody.success) {
                    response.status(400).json({
                        message: "Dados inválidos",
                        errors: validBody.error.errors,
                        });
                    return;
                } 
                const {demandId} = validBody.data
                const demandInput:CancelDemandInputDTO = {
                    input:{
                        id,
                        demandId
                    }
                }
                const output = await this.data.service.execute(demandInput)
                response.status(200).json({
                    status:200,
                    result:output.output
                })
            } catch (err) {
                if (err instanceof Error) {
                    response.status(400).json({
                        status:400,
                        message: err.message
                    });
                } else {
                    response.status(404).json({
                        status:404,
                        message: "Erro inesperado!"
                    });
                }
            }
        }
    }
}