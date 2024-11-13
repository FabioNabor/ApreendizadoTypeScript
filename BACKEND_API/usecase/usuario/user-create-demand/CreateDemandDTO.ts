import { statusDemand } from "../../../database/Enums"

export interface CreateDemandInputDTO {
    demandInput : {
        login:string
        name:string
        description:string
    }
}

export interface CreateDemandOutputDTO {
    demandOutput : {
        id:number
        status:string
        name:string
        owner:string
    }
}