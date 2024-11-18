import { Response, Request } from "express";
import { UseCase } from "../usecase/UseCase";

export enum HttpMethod {
    GET = "get",
    POST = "post",
    DELETE = "delete",
    PUT = "put"
}

export type RouteConstructor = {
    path:string,
    method:HttpMethod,
    service:UseCase<any, any>,
    auth?:boolean,
    permission?:number
}

export interface Route {
    getHandler(): (request: Request, response: Response) => Promise<void>;
    getMethod():HttpMethod
    getPath():string
    getPermission():number
    getAuth():boolean

}


export abstract class BaseControllerService implements Route {
    protected constructor(
        protected readonly data:RouteConstructor
    ){}  
    
    public abstract getHandler(): (request: Request, response: Response) => Promise<void>;
    
    public getMethod(): HttpMethod {
        return this.data.method
    }
    public getPath(): string {
        return this.data.path
    }
    
    public getPermission(): number {
        return this.data.permission ?? 0
    }

    public getAuth(): boolean {
        return this.data.auth ?? false
    }
    // protected abstract present(input:ResponseDTO):ResponseDTO;
}