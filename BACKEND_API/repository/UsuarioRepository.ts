import { Repository } from "typeorm";
import { Demandas } from "../database/entities/Demands";
import { userPermission } from "../database/entities/UsuariosPermission";
import iUsuarioRepository from "./protocols/iUsuarioRepository";
import { User } from "../database/entities/Usuario";
import { AppDataSource } from "../database/dataSource";
import { iDeleteDemand, iDemand } from "./protocols/iDemand";
import iUsuario from "./protocols/iUsuario";
import { compare } from "bcrypt";
import iAlterPassword from "./protocols/iAlterPassword";
import { UserService } from "../services/UsuarioService";

export class UsuarioRepository implements iUsuarioRepository {

    private readonly demandConn:Repository<Demandas>
    private readonly permissionConn:Repository<userPermission>
    private readonly userConn:Repository<User>
    private readonly userservice:UserService

    constructor() {
        this.demandConn = AppDataSource.getRepository(Demandas);
        this.permissionConn = AppDataSource.getRepository(userPermission);
        this.userConn = AppDataSource.getRepository(User);
        this.userservice = new UserService();
    }

    async criarUsuario(novoUser: iUsuario): Promise<User> {
        try {
            const user = await this.userConn
                .findOneBy({
                    id:novoUser.uuid
                })
            if (!user) throw new Error("Usuário que está tentando fazer a criação do novo usuário não existe");
            
            await this.userservice.containsPermission({
                uuid:user.id,
                idpermission: 2
            })

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
            throw new Error("CREATE NEW USER: "+error)
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

            await this.userservice.containsPermission({
                uuid:user.id,
                idpermission: 3
            })

            const demand = new Demandas()
            demand.nameDemand = nome
            demand.descricaoDemands = descricao
            demand.usuario = user
            await this.demandConn.save(demand)
            return demand
        } catch (error) {
            throw new Error("CREATE NEW DEMAND: "+error)
        }
    }
    async excluirDemandas(deldemand:iDeleteDemand): Promise<boolean> {
        try {
            await this.userservice.containsPermission({
                uuid:deldemand.uuidOwner,
                idpermission: 4
            })
            const findDemandsUser = await this.userConn
                .findOne({
                    where: {id:deldemand.uuidOwner},
                    relations: ['usuariosDemandas']
                })
            const demand = findDemandsUser?.usuariosDemandas.find(demand => demand.id === deldemand.idDemand)
            if (!demand) throw new Error("Demanda informada, não foi encontrada!");
            await this.demandConn.remove(demand)
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
    async alterarSenha(alterpassword:iAlterPassword): Promise<boolean> {
        try {
            const {uuid, fistpassword, novaPassword} = alterpassword
            const user = await this.userConn
                .findOneBy({
                    id:uuid
                })
            if (!user) throw new Error("Usuário informado, não foi encontrado!");

            await this.userservice.containsPermission({
                uuid:user.id,
                idpermission: 5
            })

            const comparar = await compare(fistpassword, user.userPassword)
            if (!comparar) throw new Error("Senha incorreta!");
            const compararnovasenha = await compare(novaPassword, user.userPassword)
            if (compararnovasenha) throw new Error("Você não pode alterar a senha para a mesma que está usando atualmente!");
            user.userPassword = novaPassword
            await this.userConn.save(user)
            return true
        } catch (error) {
            throw new Error("Ocorreu um erro" + error)
        }
    }

    
}