import { statusDemand } from "../../../database/Enums";
import { iDemandRepository } from "../../../repository/demand/iDemandRepository";
import { iUserRepository } from "../../../repository/user/iUserRepository";
import { UseCase } from "../../UseCase";
import { CancelDemandInputDTO, CancelDemandOutputDTO } from "../../../DTOs/demand/CancelDemandDTO";

export class CancelDemandUseCase 
    implements UseCase<CancelDemandInputDTO, CancelDemandOutputDTO> {

    private constructor(
        private repositoryDemand:iDemandRepository,
    ){}

    public static create(repositoryDemand:iDemandRepository) {
        return new CancelDemandUseCase(repositoryDemand)
    }

    async execute(data: CancelDemandInputDTO): Promise<CancelDemandOutputDTO> {
        const findDemand = await this.repositoryDemand.findDemand(data.input.demandId);
        if (!findDemand) throw new Error("Demanda não encontrada!");
        if (findDemand.user.id !== data.input.id) throw new Error("Está demanda não pertence a esse usuário!");
        if (![statusDemand.CANCELADA, statusDemand.AGUARDANDO].includes(findDemand.statusDemand)) 
            throw new Error("Demanda não pode ser cancelada!");
        const demand = await this.repositoryDemand.cancel(data)
        const output:CancelDemandOutputDTO = {
            output:{
                sucess:demand
            }
        }
        return output
    }
}