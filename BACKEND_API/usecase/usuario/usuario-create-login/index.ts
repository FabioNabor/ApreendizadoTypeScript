import { AppDataSource } from "../../../database/dataSource";
import { User } from "../../../database/entities/Usuario";
import { Postgres } from "../../../repository/usuario/implements/Posgres";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const postgres = new Postgres(AppDataSource.getRepository(User))

const createusercase = new CreateUserUseCase(postgres)

const createUserController = new CreateUserController(createusercase)

export {createUserController};