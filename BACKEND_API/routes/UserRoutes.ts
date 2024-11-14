import { Request, Response, Router } from "express";
import { createUserController, alterPasswordController, userlogincontroller, permission} from "../usecase";
import { auth } from "../middleware/auth";

export const userRoutes = Router()

userRoutes.get('/login-user', async (request: Request, response: Response) => {
    return await userlogincontroller.handle(request, response) as any;
});

userRoutes.post('/create-user', auth, permission.checkPermission(6), async (request: Request, response: Response) => {
    return await createUserController.handle(request, response) as any;
});

userRoutes.put('/alter-password', auth, permission.checkPermission(5), async (request: Request, response: Response) => {
    return await alterPasswordController.handle(request, response) as any;
});
