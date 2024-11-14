import { statusDemand } from "../../../database/Enums";
import { iDemandRepository } from "../../../repository/demand/iDemandRepository";
import { iUserRepository } from "../../../repository/user/iUserRepository";
import { UseCase } from "../../UseCase";
import { AlterStatusWhInputDTO, AlterStatusWhOutputDTO } from "./AlterStatusWhDTO";

export class AlterStatusWhUseCase 
    implements UseCase<AlterStatusWhInputDTO, AlterStatusWhOutputDTO> {

    constructor(
        private repositoryDemand:iDemandRepository,
    ){}

    async execute(data: AlterStatusWhInputDTO): Promise<AlterStatusWhOutputDTO> {
        const demandExists = await this.repositoryDemand.findDemand(data.input.id)
        if (!demandExists) throw new Error("Demanda não encontrada");
        if ([statusDemand.CANCELADA, statusDemand.FINALIZADA].includes(demandExists.status)) 
            throw new Error("Demanda não pode ter o status alterado, pois está cancelada, ou já foi finalizada!");
        const alter:AlterStatusWhOutputDTO = await this.repositoryDemand.alterStatus(data)
        return alter
    }

}