import { Request, Response, Router } from "express";
import { createUserController, alterPasswordController} from "../usecase";

export const userRoutes = Router()


userRoutes.post('/create-user', async (request: Request, response: Response) => {
    return await createUserController.handle(request, response) as any;
});

userRoutes.put('/alter-password', async (request: Request, response: Response) => {
    return await alterPasswordController.handle(request, response) as any;
});
