import { statusDemand } from "../../../database/Enums";
import { CreateDemandInputDTO, CreateDemandOutputDTO } from "../../../DTOs/demand/CreateDemandDTO";
import { iDemandRepository } from "../../../repository/demand/iDemandRepository";
import { iUserRepository } from "../../../repository/user/iUserRepository";
import { UseCase } from "../../UseCase";

export class CreateDemandUseCase 
    implements UseCase<CreateDemandInputDTO, CreateDemandOutputDTO>{

        private constructor(
            private repositoryDemand:iDemandRepository,
            private userRepository:iUserRepository
        ){}
    
        public static create(repositoryDemand:iDemandRepository, userRepository:iUserRepository) {
            return new CreateDemandUseCase(repositoryDemand, userRepository)
        }

    async execute(data:CreateDemandInputDTO):Promise<CreateDemandOutputDTO> {
        const userExists = await this.userRepository.findByID(data.input.id);
        if (!userExists) throw new Error("Usuário não existe!");
        const demand = await this.repositoryDemand.createDemand(userExists, data.input.name, data.input.description);
        const output:CreateDemandOutputDTO = {
            output:{
                status:statusDemand[demand.statusDemand],
                name:demand.nameDemand,
                owner:demand.user.id
            }
        }
        return output
    }
}