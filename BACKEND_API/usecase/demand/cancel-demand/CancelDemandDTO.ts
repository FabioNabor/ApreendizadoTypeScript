
export interface CancelDemandInputDTO {
    input : {
        ownerId:string
        demandId:number
    }
}

export interface CancelDemandOutputDTO {
    output : {
        name:string
        status:string
        message:string
    }
}