import { Request, Response, Router } from "express";
import { createUserController, alterPasswordController, createDemandController } from "../usecase";

export const routes = Router()


routes.post('/create-user', async (request: Request, response: Response) => {
    return await createUserController.handle(request, response) as any;
});

routes.put('/alter-password', async (request: Request, response: Response) => {
    return await alterPasswordController.handle(request, response) as any;
});

routes.post('/create-demand', async (request: Request, response: Response) => {
    return await createDemandController.handle(request, response) as any;
});