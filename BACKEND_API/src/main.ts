import { ExpressApi } from "../api/express/api.express"
import { AppDataSource } from "../database/dataSource"
import { Demands } from "../database/entities/Demands"
import { User } from "../database/entities/RegisterUser"
import { ListDemandController } from "../controllers/demand/ListDemandController"
import { ListDemandUseCase } from "../usecase/demand/list-demand/ListDemandUseCase"
import { CreateUserController } from "../controllers/user/CreateUserController"
import { CreateUserUseCase } from "../usecase/user/user-create-login/CreateUserUseCase"
import { UserLoginController } from "../controllers/user/UserLoginController"
import { UserLoginUseCase } from "../usecase/user/user-login/UserLoginUseCase"
import { AlterPasswordUseCase } from "../usecase/user/user-alter-password/AlterPasswordUseCase"
import { AlterPasswordController } from "../controllers/user/AlterPasswordController"
import { CancelDemandUseCase } from "../usecase/demand/cancel-demand/CancelDemandUseCase"
import { CreateDemandController } from "../controllers/demand/CreateDemandController"
import { CreateDemandUseCase } from "../usecase/demand/create-demand/CreateDemandUseCase"
import { CancelDemandController } from "../controllers/demand/CancelDemandController"
import { AlterStatusWhController } from "../controllers/demand/AlterStatusWhController"
import { AlterStatusWhUseCase } from "../usecase/demand/alter-status-webhook/AlterStatusWhUseCase"
import { PostgresUserRepository } from "../repository/implements/postgres/user-implement.postgres"
import { PostgresDemandRepository } from "../repository/implements/postgres/demand-implement.postgres"
import { LiberyPermissionUseCase } from "../usecase/permission/LiberyPermissionUseCase"
import { PostgresPermissionRepository } from "../repository/implements/postgres/permission-implement.postgres"
import { Permission } from "../database/entities/Permission"
import { userPermission } from "../database/entities/UserPermission"
import { RemovePermissionUseCase } from "../usecase/permission/RemovePermissionUseCase"
import { LiberyPermissionController } from "../controllers/permission/LiberyPermissionController"
import { RemovePermissionController } from "../controllers/permission/RemovePermissionController"

const main = () => {

    AppDataSource.initialize().then(async () => {
        console.log(await AppDataSource.runMigrations());
        console.log("Banco de Dados Pronto...")
    })

    const userRepository = PostgresUserRepository.create(AppDataSource.getRepository(User))
    const demandRepository = PostgresDemandRepository.create(AppDataSource.getRepository(Demands))
    const permissionRepository = PostgresPermissionRepository.create(AppDataSource.getRepository(Permission),
                                                                AppDataSource.getRepository(userPermission))
    
    // USER
    const userLoginUseCase = UserLoginUseCase.create(userRepository)
    const createUserUseCase = CreateUserUseCase.create(userRepository)
    const userAlterPasswordUsecase = AlterPasswordUseCase.create(userRepository)
    
    const loginRoute = UserLoginController.create(userLoginUseCase)
    const createUserRoute = CreateUserController.create(createUserUseCase)
    const userAlterRoute = AlterPasswordController.create(userAlterPasswordUsecase)

    // DEMAND
    const listDemandUseCase = ListDemandUseCase.create(demandRepository)
    const createDemandUseCase = CreateDemandUseCase.create(demandRepository, userRepository)
    const cancelDemandUseCase = CancelDemandUseCase.create(demandRepository) 
    const alterStatusUseCase = AlterStatusWhUseCase.create(demandRepository)

    const listDemandRoute = ListDemandController.create(listDemandUseCase)
    const createDemandRoute = CreateDemandController.create(createDemandUseCase)
    const cancelDemandRoute = CancelDemandController.create(cancelDemandUseCase)
    const alterStatusRoute = AlterStatusWhController.create(alterStatusUseCase)

    // PERMISSION

    const liberyPermissionUseCase = LiberyPermissionUseCase.create(permissionRepository, userRepository)
    const removePermissionUseCase = RemovePermissionUseCase.create(permissionRepository, userRepository)

    const liberyPermissionRoute = LiberyPermissionController.create(liberyPermissionUseCase)
    const removePermissionRoute = RemovePermissionController.create(removePermissionUseCase)

    const routes = [
        loginRoute, createUserRoute, userAlterRoute,
        listDemandRoute, createDemandRoute,cancelDemandRoute,
        alterStatusRoute,
        liberyPermissionRoute,
        removePermissionRoute
    ]

    const api = ExpressApi.create(routes)
    api.start(3030)

}

main();