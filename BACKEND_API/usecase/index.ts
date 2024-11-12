import { AppDataSource } from "../database/dataSource";
import { User } from "../database/entities/Usuario";
import { Postgres } from "../repository/usuario/implements/Postgres";
import { AlterPasswordController } from "./usuario/user-alter-password/AlterPasswordController";
import { AlterPasswordUseCase } from "./usuario/user-alter-password/AlterPasswordUseCase";
import { CreateUserController } from "./usuario/user-create-login/CreateUserController";
import { CreateUserUseCase } from "./usuario/user-create-login/CreateUserUseCase";


//Banco de dados
const postgres = new Postgres(AppDataSource.getRepository(User))

//UseCase
const createuserusecase = new CreateUserUseCase(postgres)
const alterpasswordusecase = new AlterPasswordUseCase(postgres)

// Action
const createUserController = new CreateUserController(createuserusecase) // criação do usuário
const alterPasswordController = new AlterPasswordController(alterpasswordusecase) // alteração de senha do usuário

export {createUserController, alterPasswordController};