import { Request, Response } from "express"
import { BaseControllerService, HttpMethod, RouteConstructor } from "../route"
import { z } from "zod"
import { RemovePermissionInputDTO } from "../../DTOs/permission/RemovePermissionDTO"
import { RemovePermissionUseCase } from "../../usecase/permission/RemovePermissionUseCase"

export class RemovePermissionController extends BaseControllerService{

    private constructor (data:RouteConstructor){super(data)}
    
    public static create(service:RemovePermissionUseCase) {
        return new RemovePermissionController({
            path:"/remove-permission",
            method:HttpMethod.PUT,
            service:service,
            auth:true,
            permission:1
        })
    }

    private RemovePermissionInputSchema = z.object({
        login:z.string().nonempty("Informe o login do usuário que deseja remover a permissão"),
        id:z.number()
    })

    public getHandler() {
        return async (request: Request, response: Response) : Promise<void> => {
            try {
                const validBody = this.RemovePermissionInputSchema.safeParse(request.body);
                if (!validBody.success) {
                    response.status(400).json({
                        message: "Dados inválidos",
                        errors: validBody.error.errors,
                      });
                      return;
                };
                const {login, id} = validBody.data;
                const input:RemovePermissionInputDTO = {
                    input:{
                        login,
                        id
                    }
                };
                const output = await this.data.service.execute(input)
                response.status(200).json({
                    status:200,
                    message:output
                });
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