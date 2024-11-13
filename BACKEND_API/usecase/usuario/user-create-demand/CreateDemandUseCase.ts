import { iCreateDemandRepository } from "../../../repository/User/iCreateDemandRepository";
import { iCreateUserRepository } from "../../../repository/User/iCreateUserRepository";
import { CreateDemandInputDTO, CreateDemandOutputDTO } from "./CreateDemandDTO";

export class CreateDemandUseCase {
    constructor(
        private createDemandRepository:iCreateDemandRepository,
        private createUserRepository:iCreateUserRepository
    ){}

    async execute(demand:CreateDemandInputDTO):Promise<CreateDemandOutputDTO> {
        const userExists = await this.createUserRepository.find(demand.demandInput.login)
        if (!userExists) throw new Error("Usuário não existe!")
        const create:CreateDemandOutputDTO = await this.createDemandRepository.createDemand(demand)
        return create
    }
}