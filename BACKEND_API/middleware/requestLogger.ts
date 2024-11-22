import { NextFunction, Request, Response } from "express";

export const logger = (request: Request, response: Response, next:NextFunction) => {
    const { method, url } = request;
    const {infUser} = request.body
    const timestamp = new Date().toISOString();
    let msg:string = `[${timestamp}] \x1b[32m${method}\x1b[0m \x1b[33m${url}\x1b[0m`
    if (infUser) msg = msg + ` \x1b[34m${infUser.login}\x1b[0m`;
    response.on("finish", () => {
        console.log(msg + ` \x1b[35m${response.statusCode}\x1b[0m`);
    });
    next();
}