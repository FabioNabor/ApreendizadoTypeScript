import { Demands } from "../../database/entities/Demands";
import { User } from "../../database/entities/RegisterUser";
import { statusDemand } from "../../database/Enums";
import { AlterStatusWhInputDTO, AlterStatusWhOutputDTO } from "../../DTOs/demand/AlterStatusWhDTO";
import { CancelDemandInputDTO, CancelDemandOutputDTO } from "../../DTOs/demand/CancelDemandDTO";
import { CreateDemandInputDTO, CreateDemandOutputDTO } from "../../DTOs/demand/CreateDemandDTO";
import { ListDemandOutputDTO } from "../../DTOs/demand/ListDemandDTO";

export interface iDemandRepository {
    createDemand(user:User, name:string, description:string):Promise<Demands>
    cancel(input:CancelDemandInputDTO):Promise<boolean>
    findDemand(id:number):Promise<Demands | null>
    alterStatus(input:AlterStatusWhInputDTO):Promise<boolean>
    list(id:string):Promise<Demands[]>
}