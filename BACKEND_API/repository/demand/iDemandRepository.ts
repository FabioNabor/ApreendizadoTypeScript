import { statusDemand } from "../../database/Enums";
import { AlterStatusWhInputDTO, AlterStatusWhOutputDTO } from "../../usecase/demand/alter-status-webhook/AlterStatusWhDTO";
import { CancelDemandInputDTO, CancelDemandOutputDTO } from "../../usecase/demand/cancel-demand/CancelDemandDTO";
import { CreateDemandInputDTO, CreateDemandOutputDTO } from "../../usecase/demand/create-demand/CreateDemandDTO";

export interface iDemandRepository {
    createDemand(demand:CreateDemandInputDTO):Promise<CreateDemandOutputDTO>
    cancel(input:CancelDemandInputDTO):Promise<CancelDemandOutputDTO>
    findDemand(id:number):Promise<{id:number, ownerId:string, status:statusDemand} | null>
    alterStatus(input:AlterStatusWhInputDTO):Promise<AlterStatusWhOutputDTO>
}