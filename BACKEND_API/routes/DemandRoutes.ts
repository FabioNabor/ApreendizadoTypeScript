import { Request, Response, Router } from "express";
import { alterstatuscontroller, createDemandController, deleteDemandController } from "../usecase";

export const demandRoutes = Router()

demandRoutes.post('/create-demand', async (request: Request, response: Response) => {
    return await createDemandController.handle(request, response) as any;
});

demandRoutes.delete('/cancel-demand', async (request: Request, response: Response) => {
    return await deleteDemandController.handle(request, response) as any;
});

demandRoutes.put('/alter-status-demand', async (request: Request, response: Response) => {
    return await alterstatuscontroller.handle(request, response) as any;
});