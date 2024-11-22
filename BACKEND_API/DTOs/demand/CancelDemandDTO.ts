
export interface CancelDemandInputDTO {
    input : {
        id:string
        demandId:number
    }
}

export interface CancelDemandOutputDTO {
    output : {
        sucess:boolean
    }
}