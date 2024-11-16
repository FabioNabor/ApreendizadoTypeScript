import { statusDemand } from "../../../database/Enums"

export interface ListDemandOutputDTO {
    output : {
        id:number
        name:string
        dataUpdate:Date
        status:string
        description:string
    }
}