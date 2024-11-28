import { ExpressApi } from "../api/express/api.express"
import { AppDataSource } from "../database/dataSource"
import { Demands } from "../database/entities/Demands"
import { User } from "../database/entities/RegisterUser"
import { ListDemandController } from "../controllers/demand/list-demand-controller"
import { ListDemandUseCase } from "../usecase/demand/list-demand/ListDemandUseCase"
import { CreateUserController } from "../controllers/user/create-user-controller"
import { CreateUserUseCase } from "../usecase/user/user-create-login/CreateUserUseCase"
import { UserLoginController } from "../controllers/user/login-user-controller"
import { UserLoginUseCase } from "../usecase/user/user-login/UserLoginUseCase"
import { AlterPasswordUseCase } from "../usecase/user/user-alter-password/AlterPasswordUseCase"
import { AlterPasswordController } from "../controllers/user/alter-password-controller"
import { CancelDemandUseCase } from "../usecase/demand/cancel-demand/CancelDemandUseCase"
import { CreateDemandController } from "../controllers/demand/create-demand-controller"
import { CreateDemandUseCase } from "../usecase/demand/create-demand/CreateDemandUseCase"
import { CancelDemandController } from "../controllers/demand/cancel-demand-controller"
import { AlterStatusWhController } from "../controllers/demand/alter-status-wh-demand-controller"
import { AlterStatusWhUseCase } from "../usecase/demand/alter-status-webhook/AlterStatusWhUseCase"
import { PostgresUserRepository } from "../repository/implements/postgres/user-implement.postgres"
import { PostgresDemandRepository } from "../repository/implements/postgres/demand-implement.postgres"
import { LiberyPermissionUseCase } from "../usecase/permission/LiberyPermissionUseCase"
import { PostgresPermissionRepository } from "../repository/implements/postgres/permission-implement.postgres"
import { Permission } from "../database/entities/Permission"
import { userPermission } from "../database/entities/UserPermission"
import { RemovePermissionUseCase } from "../usecase/permission/RemovePermissionUseCase"
import { LiberyPermissionController } from "../controllers/permission/libery-permission-controller"
import { RemovePermissionController } from "../controllers/permission/remove-permission-controller.ts"
import { addRoute, routes } from "../api/add-controller-routes"

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
    
    addRoute(UserLoginController.create(userLoginUseCase))
    addRoute(CreateUserController.create(createUserUseCase))
    addRoute(AlterPasswordController.create(userAlterPasswordUsecase))

    // DEMAND
    const listDemandUseCase = ListDemandUseCase.create(demandRepository)
    const createDemandUseCase = CreateDemandUseCase.create(demandRepository, userRepository)
    const cancelDemandUseCase = CancelDemandUseCase.create(demandRepository) 
    const alterStatusUseCase = AlterStatusWhUseCase.create(demandRepository)

    addRoute(ListDemandController.create(listDemandUseCase))
    addRoute(CreateDemandController.create(createDemandUseCase))
    addRoute(CancelDemandController.create(cancelDemandUseCase))
    addRoute(AlterStatusWhController.create(alterStatusUseCase))

    // PERMISSION

    const liberyPermissionUseCase = LiberyPermissionUseCase.create(permissionRepository, userRepository)
    const removePermissionUseCase = RemovePermissionUseCase.create(permissionRepository, userRepository)

    addRoute(LiberyPermissionController.create(liberyPermissionUseCase))
    addRoute(LiberyPermissionController.create(liberyPermissionUseCase))
    addRoute(RemovePermissionController.create(removePermissionUseCase))

    const api = ExpressApi.create(routes)
    api.start(3030)

}

main();