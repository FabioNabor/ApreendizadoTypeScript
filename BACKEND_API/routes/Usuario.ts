import { Router } from "express";
import { createNewUser } from "../controllers/UsuarioController";

export const routes = Router()


routes.post('/createuser', createNewUser)