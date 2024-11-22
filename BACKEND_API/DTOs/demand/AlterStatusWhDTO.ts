import { statusDemand } from "../../database/Enums"


export interface AlterStatusWhInputDTO {
    input : {
        idUser:string
        id:number
        status:statusDemand
    }
}

export interface AlterStatusWhOutputDTO {
    output : {
        sucess:boolean
    }
}