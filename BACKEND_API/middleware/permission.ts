import { NextFunction, Request, Response } from "express";
import { iUserRepository } from "../repository/user/iUserRepository";

export class Permission {
    constructor(
        private userRepository:iUserRepository
    ){}

    checkPermission = (idPermission:number) => {
        return async (request:Request, response:Response, next:NextFunction) => {
            const {id} = request.body.infUser.id;
            const havePermission = await this.userRepository.havePermission(id, idPermission)
            if (!havePermission) {
                response.status(403).json({
                status:403,
                message:"Você não possui permissão!"
                })
                return;
            };
            next()
        }
    }
}

