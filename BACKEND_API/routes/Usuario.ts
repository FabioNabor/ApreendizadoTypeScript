import { Router } from "express";
import { createNewUser, alterPassword } from "../controllers/UsuarioController";

export const routes = Router()


routes.post('/createuser', createNewUser)

routes.put('/alterpassword', alterPassword)