import { Request, Response, Router } from "express";
import { createUserController } from "../usecase/usuario/usuario-create-login";

export const routes = Router()


routes.post('/create-user', async (request: Request, response: Response) => {
    return await createUserController.handle(request, response) as any;
});