import { iDemandRepository } from "../../../repository/demand/iDemandRepository";
import { iUserRepository } from "../../../repository/user/iUserRepository";
import { UseCase } from "../../UseCase";
import { CreateDemandInputDTO, CreateDemandOutputDTO } from "./CreateDemandDTO";

export class CreateDemandUseCase 
    implements UseCase<CreateDemandInputDTO, CreateDemandOutputDTO>{
    constructor(
        private demandRepository:iDemandRepository,
        private userRepository:iUserRepository
    ){}

    async execute(demand:CreateDemandInputDTO):Promise<CreateDemandOutputDTO> {
        const userExists = await this.userRepository.find(demand.input.login)
        if (!userExists) throw new Error("Usuário não existe!")
        const create:CreateDemandOutputDTO = await this.demandRepository.createDemand(demand)
        return create
    }
}