import { statusDemand } from "../../../database/Enums"

export interface CreateDemandInputDTO {
    input : {
        id:string
        name:string
        description:string
    }
}

export interface CreateDemandOutputDTO {
    output : {
        id:number
        status:string
        name:string
        owner:string
    }
}