import { CreateUserUseCase } from "../../usecase/user/user-create-login/CreateUserUseCase";
import { Request, Response } from "express";
import { CreateUserInputDTO } from "../../DTOs/user/CreateUserDTO";
import {z} from "zod"
import { BaseControllerService, HttpMethod, RouteConstructor } from "../route";

export class CreateUserController extends BaseControllerService{

    private constructor (data:RouteConstructor){super(data)}

    public static create(service:CreateUserUseCase) {
        return new CreateUserController({
            path:"/create-user",
            method:HttpMethod.POST,
            service:service,
            auth:true,
            permission:2
        })
    }

    private CreateUserInputSchema = z.object({
        name:z.string().nonempty("Nome do novo usuário é obrigatório!"),
        email:z.string().nonempty("E-mail é obrigatório!").email("E-mail inválido."),
        login:z.string().nonempty("Login é obrigatório.").min(8, "Mínimo de 15 caracters para o login."),
        sector:z.string().nonempty("Setor é obrigatório."),
        password:z.string().nonempty("Senha é obrigatório").min(8, "Mínimo de 8 caracters para a senha!.")
    })

    public getHandler() {
        return async (request: Request, response: Response) : Promise<void> => {
            try { 
                const {id} = request.body.infUser
                const validBody = this.CreateUserInputSchema.safeParse(request.body);
                if (!validBody.success) {
                    response.status(400).json({
                        message: "Dados inválidos",
                        errors: validBody.error.errors,
                      });
                      return;
                } 
                const {name, email, login, sector, password} = validBody.data
                const userInput:CreateUserInputDTO = {
                    input:{
                        id,
                        name,
                        email,
                        login,
                        sector,
                        password
                    }
                }
                const user = await this.data.service.execute(userInput);
                response.status(201).json(user);
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