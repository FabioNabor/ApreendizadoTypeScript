import { statusDemand } from "../../../database/Enums"

export interface CreateDemandInputDTO {
    input : {
        login:string
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