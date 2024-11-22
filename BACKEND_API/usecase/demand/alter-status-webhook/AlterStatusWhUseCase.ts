import { statusDemand } from "../../../database/Enums";
import { AlterStatusWhInputDTO, AlterStatusWhOutputDTO } from "../../../DTOs/demand/AlterStatusWhDTO";
import { iDemandRepository } from "../../../repository/demand/iDemandRepository";
import { iUserRepository } from "../../../repository/user/iUserRepository";
import { UseCase } from "../../UseCase";

export class AlterStatusWhUseCase 
    implements UseCase<AlterStatusWhInputDTO, AlterStatusWhOutputDTO> {

    private constructor(
        private repositoryDemand:iDemandRepository,
    ){}

    public static create(repositoryDemand:iDemandRepository) {
        return new AlterStatusWhUseCase(repositoryDemand)
    }

    async execute(data: AlterStatusWhInputDTO): Promise<AlterStatusWhOutputDTO> {
        const demandExists = await this.repositoryDemand.findDemand(data.input.id)
        if (!demandExists) throw new Error("Demanda não encontrada");
        if ([statusDemand.CANCELADA, statusDemand.FINALIZADA].includes(demandExists.statusDemand)) 
            throw new Error("Demanda não pode ter o status alterado, pois está cancelada, ou já foi finalizada!");
        const alter = await this.repositoryDemand.alterStatus(data)
        const output:AlterStatusWhOutputDTO = {
            output:{
                sucess:alter
            }
        }
        return output
    }

}