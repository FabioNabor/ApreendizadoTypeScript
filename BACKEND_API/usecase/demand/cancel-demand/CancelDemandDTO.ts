
export interface CancelDemandInputDTO {
    input : {
        id:string
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