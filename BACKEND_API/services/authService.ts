import { JwtPayload, sign, verify } from "jsonwebtoken"
import 'dotenv/config'

interface LoginInputDTO {
    id:string
    login:string
    name:string
    permissions:number[]
}

export const authService = {
    async genToken(input:LoginInputDTO):Promise<string> {
        const token = await sign({
            id:input.id,
            login:input.login,
            name:input.name,
            permissions:input.permissions
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn:process.env.EXPIRES || "1h"
        })
        return token
    },
    async verifyToken(token:string):Promise<JwtPayload | string> {
        return await verify(token, process.env.JWT_SECRET as string)
    }
}