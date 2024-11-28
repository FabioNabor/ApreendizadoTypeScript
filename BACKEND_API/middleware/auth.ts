import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { authService } from "../services/authService";

export const auth = async (request:Request, response:Response ,next:NextFunction) => {
    try {
        const token = request.headers.authorization;
        if (!token) {
            response.status(401).json({
                status:401,
                message:"Não autorizado!"
            })
            return;
        }
        const jwt_token = token.split(" ")[1]
        const verifyInput = verify(jwt_token, process.env.JWT_SECRET as string)
        if (!verifyInput) {
            response.status(403).json({
                status:403,
                message:"Token Invalido!"
            })
            return;
        }

        const decoded = await authService.verifyToken(jwt_token)
        request.body.infUser = decoded

        next()
    } catch (err) {
        if (err instanceof Error) {
            response.status(403).json({
                status:403,
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