import {z} from "zod"
import { Request, Response } from "express";
import { CreateDemandUseCase } from "../../usecase/demand/create-demand/CreateDemandUseCase";
import { BaseControllerService, HttpMethod, RouteConstructor } from "../route";
import { CreateDemandInputDTO, CreateDemandOutputDTO } from "../../DTOs/demand/CreateDemandDTO";

export class CreateDemandController extends BaseControllerService{

    private constructor (protected readonly data:RouteConstructor){super(data)}

    public static create(service:CreateDemandUseCase) {
        return new CreateDemandController({
            path:"/create-demand",
            method:HttpMethod.POST,
            service:service,
            auth:true,
            permission:3
        })
    }

    private CreateDemandInputSchema = z.object({
        name:z.string().nonempty("Nome é obrigatório!").min(10, "Mínimo de 10 caracters para o nome.")
            .max(100, "Máximo de 100 caracters"),
        description:z.string().nonempty("Descrição é obrigatório.").min(30, "Mínimo de 30 caracters para a descrição.")
            .max(150, "Máximo de 150 caracters"),
    })

    public getHandler() {
        return async (request: Request, response: Response) : Promise<void> => {
            try {
                const {id} = request.body.infUser
                const validBody = this.CreateDemandInputSchema.safeParse(request.body);
                if (!validBody.success) {
                    response.status(400).json({
                        message: "Dados inválidos",
                        errors: validBody.error.errors,
                      });
                    return;
                } 
                const {name, description} = validBody.data
                const demandInput:CreateDemandInputDTO = {
                    input:{
                        id,
                        name,
                        description
                    }
                }
                const create:CreateDemandOutputDTO = await this.data.service.execute(demandInput)
                response.status(201).json({
                    status:201,
                    demandInf:create.output
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