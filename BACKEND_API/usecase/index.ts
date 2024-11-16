import { AppDataSource } from "../database/dataSource";
import { Demands } from "../database/entities/Demands";
import { User } from "../database/entities/RegisterUser";
import { Postgres } from "../repository/implements/Postgres";
import { AlterPasswordController } from "./user/user-alter-password/AlterPasswordController";
import { AlterPasswordUseCase } from "./user/user-alter-password/AlterPasswordUseCase";
import { CreateDemandController } from "./demand/create-demand/CreateDemandController";
import { CreateDemandUseCase } from "./demand/create-demand/CreateDemandUseCase";
import { CreateUserController } from "./user/user-create-login/CreateUserController";
import { CreateUserUseCase } from "./user/user-create-login/CreateUserUseCase";
import { CancelDemandUseCase } from "./demand/cancel-demand/CancelDemandUseCase";
import { CancelDemandController } from "./demand/cancel-demand/CancelDemandController";
import { AlterStatusWhUseCase } from "./demand/alter-status-webhook/AlterStatusWhUseCase";
import { AlterStatusWhController } from "./demand/alter-status-webhook/AlterStatusWhController";
import { UserLoginUseCase } from "./user/user-login/UserLoginUseCase";
import { UserLoginController } from "./user/user-login/UserLoginController";
import { userPermission } from "../database/entities/UserPermission";
import { Permission } from "../middleware/permission";
import { ListDemandController } from "./demand/list-demand/ListDemandController";
import { ListDemandUseCase } from "./demand/list-demand/ListDemandUseCase";

const repository = new Postgres(AppDataSource.getRepository(User), 
                                AppDataSource.getRepository(Demands),
                                    AppDataSource.getRepository(userPermission));
                         
const createUserController = new CreateUserController(new CreateUserUseCase(repository))
const alterPasswordController = new AlterPasswordController(new AlterPasswordUseCase(repository))
const createDemandController = new CreateDemandController(new CreateDemandUseCase(repository, repository))
const deleteDemandController = new CancelDemandController(new CancelDemandUseCase(repository))
const listDemandsController = new ListDemandController(new ListDemandUseCase(repository))
const alterstatuscontroller = new AlterStatusWhController(new AlterStatusWhUseCase(repository))
const userlogincontroller = new UserLoginController(new UserLoginUseCase(repository))

                                    
const permission = new Permission(repository)

export {createUserController, alterPasswordController,
         createDemandController, deleteDemandController, 
            alterstatuscontroller,userlogincontroller, listDemandsController, permission};