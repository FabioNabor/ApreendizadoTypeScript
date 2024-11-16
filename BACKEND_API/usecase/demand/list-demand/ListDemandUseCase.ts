import { iDemandRepository } from "../../../repository/demand/iDemandRepository";
import { UseCase } from "../../UseCase";
import { ListDemandOutputDTO } from "./ListDemandDTO";

export class ListDemandUseCase
    implements UseCase<string, ListDemandOutputDTO[]> {

    constructor(
        private demandRepository:iDemandRepository
    ){}

    async execute(data: string): Promise<ListDemandOutputDTO[]> {
        const listDemands:ListDemandOutputDTO[] = await this.demandRepository.list(data)
        return listDemands
    }

}