import { Repository } from "typeorm";
import { User } from "../../../database/entities/RegisterUser";
import { AlterPasswordInputDtO } from "../../../DTOs/user/AlterPasswordDTO";
import { CreateUserInputDTO } from "../../../DTOs/user/CreateUserDTO";
import { iUserRepository } from "../../user/iUserRepository";
import { iDemandRepository } from "../../demand/iDemandRepository";
import { Demands } from "../../../database/entities/Demands";
import { AlterStatusWhInputDTO } from "../../../DTOs/demand/AlterStatusWhDTO";
import { CancelDemandInputDTO } from "../../../DTOs/demand/CancelDemandDTO";
import { CreateDemandInputDTO } from "../../../DTOs/demand/CreateDemandDTO";
import { statusDemand } from "../../../database/Enums";

export class PostgresDemandRepository implements iDemandRepository {

    private constructor(
        private repository:Repository<Demands>
    ){}

    public static create(repository:Repository<Demands>) {
        return new PostgresDemandRepository(repository)
    }

    async createDemand(user:User, name:string, description:string): Promise<Demands> {
        const create = await this.repository.create({
            nameDemand:name,
            user:user,
            descriptionDemand:description
        })
        return create
    }
    async cancel(input: CancelDemandInputDTO): Promise<boolean> {
        const demand = await this.repository.findOneBy({
            id:input.input.demandId
        })
        if (!demand) {return false}
        demand.statusDemand = statusDemand.CANCELADA
        return true
    }
    async findDemand(id: number): Promise<Demands | null> {
        const demand = await this.repository.findOneBy({
            id
        })
        return demand
    }
    async alterStatus(input: AlterStatusWhInputDTO): Promise<boolean> {
        const demand = await this.repository.findOneBy({
            id:input.input.id,
            userId:input.input.idUser
        })
        if (!demand) {return false}
        demand.statusDemand = input.input.status
        return true
    }
    async list(id: string): Promise<Demands[]> {
        const demand = await this.repository.find({
            where:{userId:id}
        })
        return demand
    }
}