import { AppDataSource } from "../database/dataSource";
import { Demandas } from "../database/entities/Demands";
import { User } from "../database/entities/Usuario";
import { Postgres } from "../repository/usuario/implements/Postgres";
import { AlterPasswordController } from "./usuario/user-alter-password/AlterPasswordController";
import { AlterPasswordUseCase } from "./usuario/user-alter-password/AlterPasswordUseCase";
import { CreateDemandController } from "./usuario/user-create-demand/CreateDemandController";
import { CreateDemandUseCase } from "./usuario/user-create-demand/CreateDemandUseCase";
import { CreateUserController } from "./usuario/user-create-login/CreateUserController";
import { CreateUserUseCase } from "./usuario/user-create-login/CreateUserUseCase";


//Banco de dados
const postgres = new Postgres(AppDataSource.getRepository(User), AppDataSource.getRepository(Demandas))

//UseCase
const createuserusecase = new CreateUserUseCase(postgres)
const alterpasswordusecase = new AlterPasswordUseCase(postgres)
const createdemandusecase = new CreateDemandUseCase(postgres, postgres)

// Action
const createUserController = new CreateUserController(createuserusecase) // criação do usuário
const alterPasswordController = new AlterPasswordController(alterpasswordusecase) // alteração de senha do usuário
const createDemandController = new CreateDemandController(createdemandusecase) // alteração de senha do usuário

export {createUserController, alterPasswordController, createDemandController};