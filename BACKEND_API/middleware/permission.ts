import { NextFunction, Request, Response } from "express";



export const checkPermission = (number:number) => {
    return async (request:Request, response:Response, next:NextFunction) => {
        const permissions:number[] = request.body.infUser.permissions;
        if (!permissions.includes(number)) {
            response.status(403).json({
            status:403,
            message:"Você não possui permissão!"
            })
            return;
        };
    }
}


