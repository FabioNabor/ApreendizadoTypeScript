import { AppDataSource } from "../database/dataSource";
import { Demandas } from "../database/entities/Demands";
import { User } from "../database/entities/Usuario";
import { Postgres } from "../repository/usuario/implements/Postgres";
import { AlterPasswordController } from "./usuario/user-alter-password/AlterPasswordController";
import { AlterPasswordUseCase } from "./usuario/user-alter-password/AlterPasswordUseCase";
import { CreateDemandController } from "./demand/create-demand/CreateDemandController";
import { CreateDemandUseCase } from "./demand/create-demand/CreateDemandUseCase";
import { CreateUserController } from "./usuario/user-create-login/CreateUserController";
import { CreateUserUseCase } from "./usuario/user-create-login/CreateUserUseCase";
import { CancelDemandUseCase } from "./demand/cancel-demand/CancelDemandUseCase";
import { CancelDemandController } from "./demand/cancel-demand/CancelDemandController";
import { AlterStatusWhUseCase } from "./demand/alter-status-webhook/AlterStatusWhUseCase";
import { AlterStatusWhController } from "./demand/alter-status-webhook/AlterStatusWhController";


//Banco de dados
const postgres = new Postgres(AppDataSource.getRepository(User), AppDataSource.getRepository(Demandas))

//UseCase
const createuserusecase = new CreateUserUseCase(postgres)
const alterpasswordusecase = new AlterPasswordUseCase(postgres)
const createdemandusecase = new CreateDemandUseCase(postgres, postgres)
const canceldemandusecase = new CancelDemandUseCase(postgres)
const alterstatususecase = new AlterStatusWhUseCase(postgres)

// Action
const createUserController = new CreateUserController(createuserusecase) // criação do usuário
const alterPasswordController = new AlterPasswordController(alterpasswordusecase) // alteração de senha do usuário
const createDemandController = new CreateDemandController(createdemandusecase) // alteração de senha do usuário
const deleteDemandController = new CancelDemandController(canceldemandusecase)
const alterstatuscontroller = new AlterStatusWhController(alterstatususecase)

export {createUserController, alterPasswordController,
         createDemandController, deleteDemandController, alterstatuscontroller};