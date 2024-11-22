import { Request, Response } from "express"
import { LiberyPermissionUseCase } from "../../usecase/permission/LiberyPermissionUseCase"
import { BaseControllerService, HttpMethod, RouteConstructor } from "../route"
import { z } from "zod"
import { LiberyPermissionInputDTO } from "../../DTOs/permission/liberyPermissionDTO"

export class LiberyPermissionController extends BaseControllerService{

    private constructor (data:RouteConstructor){super(data)}
    
    public static create(service:LiberyPermissionUseCase) {
        return new LiberyPermissionController({
            path:"/libery-permission",
            method:HttpMethod.PUT,
            service:service,
            auth:true,
            permission:1
        })
    }

    private LiberyPermissionInputSchema = z.object({
        login:z.string().nonempty("Informe o login do usuário que deseja adicionar a permissão"),
        id:z.number()
    })

    public getHandler() {
        return async (request: Request, response: Response) : Promise<void> => {
            try {
                const validBody = this.LiberyPermissionInputSchema.safeParse(request.body);
                if (!validBody.success) {
                    response.status(400).json({
                        message: "Dados inválidos",
                        errors: validBody.error.errors,
                      });
                      return;
                };
                const {login, id} = validBody.data;
                const input:LiberyPermissionInputDTO = {
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