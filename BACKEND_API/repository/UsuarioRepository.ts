import { Repository } from "typeorm";
import { Demandas } from "../database/entities/Demands";
import { userPermission } from "../database/entities/UsuariosPermission";
import iUsuarioRepository from "./protocols/iUsuarioRepository";
import { User } from "../database/entities/Usuario";
import { AppDataSource } from "../database/dataSource";
import iDemand from "./protocols/iDemand";
import iUsuario from "./protocols/iUsuario";

export class UsuarioRepository implements iUsuarioRepository {

    private readonly demandConn:Repository<Demandas>
    private readonly permissionConn:Repository<userPermission>
    private readonly userConn:Repository<User>

    constructor() {
        this.demandConn = AppDataSource.getRepository(Demandas);
        this.permissionConn = AppDataSource.getRepository(userPermission);
        this.userConn = AppDataSource.getRepository(User);
    }

    async criarUsuario(novoUser: iUsuario): Promise<User> {
        try {
            const nuser = new User()
            const {name, login, email, setor, password} = novoUser 
            nuser.userName = name
            nuser.userLogin = login
            nuser.userEmail = email
            nuser.userSetor = setor
            nuser.userPassword = password
            await this.userConn.save(nuser)
            return nuser
        } catch (error) {
            throw new Error("Ocorreu um erro ao tentar criar o novo usuário" + error)
        }
    }
    async criarDemand(novoUser: iDemand): Promise<Demandas> {
        try {
            const {uuidUser, nome, descricao} = novoUser
            const user = await this.userConn
                .findOneBy({
                    id:uuidUser
                })
            if (!user) throw new Error("Usuário informado, não foi encontrado!");
            const demand = new Demandas()
            demand.nameDemand = nome
            demand.descricaoDemands = descricao
            demand.usuario = user
            await this.demandConn.save(demand)
            return demand
        } catch (error) {
            throw new Error("Ocorreu um erro ao tentar criar a demanda" + error)
        }
    }
    async excluirDemandas(id:number): Promise<boolean> {
        try {
            const user = await this.demandConn
                .findOneBy({
                    id:id
                })
            if (!user) throw new Error("Demanda informada, não foi encontrada!");
            await this.demandConn.remove(user)
            return true
        } catch (error) {
            throw new Error("Ocorreu um erro" + error)
        }
    }
    async listarDemandas(uuid: string): Promise<Demandas[]> {
        try {
            const user = await this.userConn
                .findOneBy({
                    id:uuid
                })
            if (!user) throw new Error("Usuário informado, não foi encontrado!");
            const demands = await this.demandConn.findBy({
                usuario:user
            })
            return demands
        } catch (error) {
            throw new Error("Ocorreu um erro ao tentar listar as demandas" + error)
        }
    }
    async listarPermissions(uuid: string): Promise<userPermission[]> {
        try {
            const user = await this.userConn
                .findOneBy({
                    id:uuid
                })
            if (!user) throw new Error("Usuário informado, não foi encontrado!");
            const permissions = await this.permissionConn.findBy({
                user:user
            })
            return permissions
        } catch (error) {
            throw new Error("Ocorreu um erro ao tentar listar as demandas" + error)
        }
    }
    async alterarSenha(uuid: string, firstPassoword: string, novaPassword: string): Promise<boolean> {
        try {
            const user = await this.userConn
                .findOneBy({
                    id:uuid
                })
            if (!user) throw new Error("Usuário informado, não foi encontrado!");
            if (user.userPassword !== firstPassoword) throw new Error("Senha incorreta!");
            user.userPassword = novaPassword
            await this.userConn.save(user)
            return true
        } catch (error) {
            throw new Error("Ocorreu um erro" + error)
        }
    }

    
}