import { Request, Response, Router } from "express";
import { alterstatuscontroller, createDemandController, deleteDemandController, permission } from "../usecase";
import { auth } from "../middleware/auth";

export const demandRoutes = Router()

demandRoutes.post('/create-demand', auth, permission.checkPermission(3), async (request: Request, response: Response) => {
    return await createDemandController.handle(request, response) as any;
});

demandRoutes.delete('/cancel-demand', auth, permission.checkPermission(4), async (request: Request, response: Response) => {
    return await deleteDemandController.handle(request, response) as any;
});

demandRoutes.put('/alter-status-demand', auth, permission.checkPermission(6), async (request: Request, response: Response) => {
    return await alterstatuscontroller.handle(request, response) as any;
});