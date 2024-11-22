import { User } from "../../database/entities/RegisterUser"

export interface CreateDemandInputDTO {
    input : {
        id:string
        name:string
        description:string
    }
}

export interface CreateDemandOutputDTO {
    output : {
        status:string
        name:string
        owner:string
    }
}