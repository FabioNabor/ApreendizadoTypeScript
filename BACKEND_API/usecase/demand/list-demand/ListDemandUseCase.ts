import { id } from "inversify";
import { Demands } from "../../../database/entities/Demands";
import { ListDemandOutputDTO } from "../../../DTOs/demand/ListDemandDTO";
import { iDemandRepository } from "../../../repository/demand/iDemandRepository";
import { UseCase } from "../../UseCase";
import { statusDemand } from "../../../database/Enums";

export class ListDemandUseCase
    implements UseCase<string, ListDemandOutputDTO[]> {

    private constructor(
        private repositoryDemand:iDemandRepository,
    ){}

    public static create(repositoryDemand:iDemandRepository) {
        return new ListDemandUseCase(repositoryDemand)
    }

    async execute(data: string): Promise<ListDemandOutputDTO[]> {
        const listDemands:Demands[] = await this.repositoryDemand.list(data)
        if (!listDemands) throw new Error("Usuário não possui nenhuma demanda.");
        const output:ListDemandOutputDTO[] = listDemands.map(demand => ({
            output:{
                id:demand.id,
                name:demand.nameDemand,
                dataUpdate:demand.dateUpdate,
                status:statusDemand[demand.statusDemand],
                description:demand.descriptionDemand
            }
        }));
        return output
    }

}