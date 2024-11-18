import { ExpressApi } from "../api/express/api.express"
import { AppDataSource } from "../database/dataSource"
import { Demands } from "../database/entities/Demands"
import { User } from "../database/entities/RegisterUser"
import { userPermission } from "../database/entities/UserPermission"
import { Postgres } from "../repository/implements/Postgres"
import { ListDemandController } from "../controllers/demand/ListDemandController"
import { ListDemandUseCase } from "../usecase/demand/list-demand/ListDemandUseCase"
import { CreateUserController } from "../controllers/user/CreateUserController"
import { CreateUserUseCase } from "../usecase/user/user-create-login/CreateUserUseCase"
import { UserLoginController } from "../controllers/user/UserLoginController"
import { UserLoginUseCase } from "../usecase/user/user-login/UserLoginUseCase"

const main = () => {

    AppDataSource.initialize().then(async () => {
        console.log(await AppDataSource.runMigrations());
        console.log("Banco de Dados Pronto...")
    })

    const bd = new Postgres(AppDataSource.getRepository(User), AppDataSource.getRepository(Demands),
                                AppDataSource.getRepository(userPermission));

    const userLoginUseCase = new UserLoginUseCase(bd)
    const listDemandUseCase = new ListDemandUseCase(bd)
    const createUserUseCase = new CreateUserUseCase(bd)

    const loginRoute = UserLoginController.create(userLoginUseCase)
    const listDemandRoute = ListDemandController.create(listDemandUseCase)
    const createUserRoute = CreateUserController.create(createUserUseCase)

    const api = ExpressApi.create([loginRoute, listDemandRoute, createUserRoute])
    api.start(3030)

}

main();