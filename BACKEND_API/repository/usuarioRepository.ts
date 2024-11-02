import { Response } from 'express';
import iUsuarioRepository from './protocols/iUsuarioRepository'
import iUsuario from './protocols/iUsuario';
import { Repository } from 'typeorm';
import { User } from '../database/entities/eUsuario';
import { AppDataSource } from '../database/dataSource';

export class UsuarioRepository implements iUsuarioRepository {

    private readonly conexao:Repository<User>

    constructor() {this.conexao = AppDataSource.getRepository(User)}

    criarUsuario(novoUsuario: iUsuario): Promise<Response> {
        throw new Error('Method not implemented.');
    }
    alterarSenha(uuid: string, firstPassoword: string, novaPassword: string): Promise<Response> {
        throw new Error('Method not implemented.');
    }
    listarUsuarios(uuid: string): Promise<Response> {
        throw new Error('Method not implemented.');
    }
    listarDemandas(uuid: string): Promise<Response> {
        throw new Error('Method not implemented.');
    }
    listarPermissions(uuid: string): Promise<Response> {
        throw new Error('Method not implemented.');
    }
    
}