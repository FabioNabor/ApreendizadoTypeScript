import { AlterStatusWhUseCase } from "../../usecase/demand/alter-status-webhook/AlterStatusWhUseCase";
import { Request, Response } from "express";
import {z} from "zod"
import { AlterStatusWhInputDTO } from "../../usecase/demand/alter-status-webhook/AlterStatusWhDTO";
import { BaseControllerService, HttpMethod, RouteConstructor } from "../route";

export class AlterStatusWhController extends BaseControllerService{

    private constructor (data:RouteConstructor){super(data)}

    public static create(service:AlterStatusWhUseCase) {
        return new AlterStatusWhController({
            path:"/alter-status-demand",
            method:HttpMethod.PUT,
            service:service,
            auth:true,
            permission:6
        })
    }

    private AlterStatusWhInputSchema = z.object({
        id:z.number(),
        status:z.number()
    })

    public getHandler() {
        return async (request: Request, response: Response) : Promise<void> => {
            try {
                const {id:idUser} = request.body.infUser
                const validBody = this.AlterStatusWhInputSchema.safeParse(request.body);
                if (!validBody.success) {
                    response.status(400).json({
                        message: "Dados inválidos",
                        errors: validBody.error.errors,
                      });
                    return;
                } 
                const {id, status} = validBody.data
                const data:AlterStatusWhInputDTO = {
                    input : {
                        idUser,
                        id,
                        status
                    }
                }
                const output = await this.data.service.execute(data)
                response.status(200).json({
                    status:200,
                    message:output.output
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