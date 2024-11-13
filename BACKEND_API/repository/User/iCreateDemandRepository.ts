import { CreateDemandInputDTO, CreateDemandOutputDTO } from "../../usecase/usuario/user-create-demand/CreateDemandDTO";

export interface iCreateDemandRepository {
    createDemand(demand:CreateDemandInputDTO):Promise<CreateDemandOutputDTO>
}