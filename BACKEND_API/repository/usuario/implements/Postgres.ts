import { CreateUserInputDTO, CreateUserOutputDTO } from "../../../usecase/usuario/user-create-login/CreateUserDTO";
import { compare } from "bcrypt";
import { Repository } from "typeorm";
import { User } from "../../../database/entities/Usuario";
import { iUserRepository } from "../../user/iUserRepository";
import { AlterPasswordInputDtO, AlterPasswordOutputDtO } from "../../../usecase/usuario/user-alter-password/AlterPasswordDTO";
import { iDemandRepository } from "../../demand/iDemandRepository";
import { CreateDemandInputDTO, CreateDemandOutputDTO } from "../../../usecase/demand/create-demand/CreateDemandDTO";
import { Demandas } from "../../../database/entities/Demands";
import { statusDemand } from "../../../database/Enums";
import { CancelDemandInputDTO, CancelDemandOutputDTO } from "../../../usecase/demand/cancel-demand/CancelDemandDTO";
import { AlterStatusWhInputDTO, AlterStatusWhOutputDTO } from "../../../usecase/demand/alter-status-webhook/AlterStatusWhDTO";

export class Postgres implements iUserRepository, iDemandRepository {

    constructor(
        private repositoryUser:Repository<User>,
        private repositoryDemand:Repository<Demandas>
    ){}
    
    async create(userInput: CreateUserInputDTO): Promise<CreateUserOutputDTO> {
        const user = new User();
        user.userName = userInput.input.name
        user.userLogin = userInput.input.login
        user.userSetor = userInput.input.sector
        user.userEmail = userInput.input.email
        user.userPassword = userInput.input.password
        const save:User = await this.repositoryUser.save(user)
        return {
            output : {
                id:save.id,
                name:save.userName,
                login:save.userLogin
            }
        }
    }
    async find(login: string): Promise<CreateUserOutputDTO | null> {
        const user = await this.repositoryUser.findOneBy({
            userLogin:login
        })
        if (!user) {
            return user
        }
        return {
            output : {
                id:user.id,
                name:user.userName,
                login:user.userLogin
            }
        }
    }
    
    async alterPassword(alterInput: AlterPasswordInputDtO): Promise<AlterPasswordOutputDtO> {
        const user = await this.repositoryUser.findOneBy({
            userLogin:alterInput.input.login
        })
        if (!user) throw new Error("Usuário não encontrado!");
        const check = await compare(alterInput.input.oldPassword, user.userPassword) 
        if (!check) throw new Error("Senha inválida");
        const isNew = await compare(alterInput.input.newPassword, user.userPassword) 
        if (isNew) throw new Error("Informe uma senha diferente da atual!");
        user.userPassword = alterInput.input.newPassword
        await user.save()
        const alterOutput:AlterPasswordOutputDtO = {
            output:{
                login:user.userLogin,
                message:"Senha Alterada com sucesso!"
            }
        }
        return alterOutput
    }
    
    async createDemand(demand: CreateDemandInputDTO): Promise<CreateDemandOutputDTO> {
        const user = await this.repositoryUser.findOneBy({
            userLogin:demand.input.login
        })
        if (!user) throw new Error("Usuário não encontrado!");
        const create = new Demandas()
        create.nameDemand = demand.input.name
        create.usuario = user
        create.descricaoDemands = demand.input.description
        const save:Demandas = await this.repositoryDemand.save(create)
        const demandOutput:CreateDemandOutputDTO = {
            output:{
                id:save.id,
                status:statusDemand[save.statusDemands],
                name:save.nameDemand,
                owner:user.userLogin
            }
        }
        return demandOutput
    }

    async cancel(input: CancelDemandInputDTO): Promise<CancelDemandOutputDTO> {
        const demandFind = await this.repositoryDemand.findOneBy({
            id:input.input.demandId
        })
        if (!demandFind) throw new Error("Demanda não encontrada!");
        demandFind.statusDemands = statusDemand.CANCELADA
        const save = await demandFind.save()
        const cancelOutput:CancelDemandOutputDTO = {
            output: {
                name:save.nameDemand,
                status:statusDemand[save.statusDemands],
                message:"Demanda cancelado com sucesso!"
            }
        }
        return cancelOutput
    }

    async findDemand(id: number): Promise<{ id: number; ownerId: string; status: statusDemand; } | null> {
        try {
            const demandFind = await this.repositoryDemand.findOneBy({
                id:id
            })
            if (!demandFind) return null;
            return {
                id:id,
                ownerId:demandFind.usuarioId,
                status: demandFind.statusDemands
            }
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async alterStatus(input: AlterStatusWhInputDTO): Promise<AlterStatusWhOutputDTO> {
        const demandFind = await this.repositoryDemand.findOneBy({
            id:input.input.id
        })
        if (!demandFind) return {
            output: {
                sucess:false,
                message:"Demanda não encontrada em nossa base"
            }
        };
        demandFind.statusDemands = input.input.status
        await demandFind.save()
        return {
            output: {
                sucess:true,
                message:"Status Atualizado"
            }
        }
    }
}