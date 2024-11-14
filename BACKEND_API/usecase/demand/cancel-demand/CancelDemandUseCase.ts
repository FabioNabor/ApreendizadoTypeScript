import { statusDemand } from "../../../database/Enums";
import { iDemandRepository } from "../../../repository/demand/iDemandRepository";
import { iUserRepository } from "../../../repository/user/iUserRepository";
import { UseCase } from "../../UseCase";
import { CancelDemandInputDTO, CancelDemandOutputDTO } from "./CancelDemandDTO";

export class CancelDemandUseCase 
    implements UseCase<CancelDemandInputDTO, CancelDemandOutputDTO> {
        constructor(
            private demandRepository:iDemandRepository,
        ){}
    async execute(data: CancelDemandInputDTO): Promise<CancelDemandOutputDTO> {
        const findDemand = await this.demandRepository.findDemand(data.input.demandId);
        if (!findDemand) throw new Error("Demanda não encontrada!");
        if (findDemand.ownerId !== data.input.id) throw new Error("Está demanda não pertence a esse usuário!");
        if (![statusDemand.CANCELADA, statusDemand.AGUARDANDO].includes(findDemand.status)) 
            throw new Error("Demanda não pode ser cancelada!");
        const output:CancelDemandOutputDTO = await this.demandRepository.cancel(data)
        return output
    }
}