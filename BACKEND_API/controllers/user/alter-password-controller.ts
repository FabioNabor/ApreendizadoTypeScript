
import { Request, Response } from "express";
import {z} from "zod"
import { BaseControllerService, HttpMethod, RouteConstructor } from "../route";
import { AlterPasswordUseCase } from "../../usecase/user/user-alter-password/AlterPasswordUseCase";
import { AlterPasswordInputDtO } from "../../DTOs/user/AlterPasswordDTO";
import { addRoute } from "../../api/add-controller-routes";



export class AlterPasswordController extends BaseControllerService{

    private constructor (protected readonly data:RouteConstructor){super(data)}
    
    public static create(service:AlterPasswordUseCase) {
        return new AlterPasswordController({
            path:"/alter-password",
            method:HttpMethod.PUT,
            service:service,
            auth:true,
            permission:5
        })
    }

    private AlterPasswordInputSchema = z.object({
        oldPassword:z.string().nonempty("Informe a senha antiga").min(8, "O tamanho minímo da senha é de 8 caractes"),
        newPassword:z.string().nonempty("Informe a nova senha").min(8, "O tamanho minímo da senha é de 8 caractes")
    })

    public getHandler() {
        return async (request: Request, response: Response) : Promise<void> => {
            try {
                const {id} = request.body.infUser
                const validBody = this.AlterPasswordInputSchema.safeParse(request.body);
                if (!validBody.success) {
                    response.status(400).json({
                        message: "Dados inválidos",
                        errors: validBody.error.errors,
                      });
                      return;
                } 
                const {oldPassword, newPassword} = validBody.data
                const data:AlterPasswordInputDtO = {
                    input : {
                        id,
                        oldPassword,
                        newPassword
                    }
                }
                const alter = await this.data.service.execute(data)
                response.status(200).json({
                    status:200,
                    message:alter.output
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