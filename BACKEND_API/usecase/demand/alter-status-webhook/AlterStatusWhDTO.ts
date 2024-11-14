import { statusDemand } from "../../../database/Enums"

export interface AlterStatusWhInputDTO {
    input : {
        id:number
        status:statusDemand
    }
}

export interface AlterStatusWhOutputDTO {
    output : {
        sucess:boolean
        message:string
    }
}