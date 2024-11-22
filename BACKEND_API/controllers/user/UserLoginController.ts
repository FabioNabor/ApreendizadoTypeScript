import { z } from "zod";
import { Request, Response } from "express";
import { UserLoginUseCase } from "../../usecase/user/user-login/UserLoginUseCase";
import { UserLoignInputDTO, UserLoignOutputDTO } from "../../DTOs/user/UserLoginDTO";
import { BaseControllerService, HttpMethod, RouteConstructor } from "../route";

export class UserLoginController extends BaseControllerService {
    private constructor (data:RouteConstructor){super(data)}
    
    public static create(service:UserLoginUseCase) {
        return new UserLoginController({
            path:"/login-user",
            method:HttpMethod.GET,
            service:service
        })
    }

    private UserLoginInputSchema = z.object({
        email:z.string().nonempty("E-mail é obrigatório!").email("E-mail inválido."),
        login:z.string().nonempty("Login é obrigatório.").min(8, "Mínimo de 8 caracters para o login."),
        password:z.string().nonempty("Senha é obrigatório").min(8, "Mínimo de 8 caracters para a senha!.")
    })

    
    public getHandler() {
        return async (request: Request, response: Response) : Promise<void> => {
            try {
                const validBody = this.UserLoginInputSchema.safeParse(request.body);
                if (!validBody.success) {
                    response.status(400).json({
                        message: "Dados inválidos",
                        errors: validBody.error.errors,
                        });
                        return;
                } 
                const {email, login, password} = validBody.data
                const input:UserLoignInputDTO = {
                    input : {
                        login,
                        email,
                        password
                    }
                }
                const output:UserLoignOutputDTO = await this.data.service.execute(input)
                response.status(200).json({
                    status:200,
                    output
                })
            } catch (err) {
                console.log(err)
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