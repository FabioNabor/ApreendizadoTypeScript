import { Repository } from "typeorm";
import { User } from "../../../database/entities/RegisterUser";
import { AlterPasswordInputDtO } from "../../../DTOs/user/AlterPasswordDTO";
import { CreateUserInputDTO } from "../../../DTOs/user/CreateUserDTO";
import { iUserRepository } from "../../user/iUserRepository";

export class PostgresUserRepository implements iUserRepository {

    private constructor(
        private repository:Repository<User>
    ){}

    public static create(repository:Repository<User>) {
        return new PostgresUserRepository(repository)
    }

    async create(userInput: User): Promise<User> {
        const user = await this.repository.create({
            userName:userInput.userName,
            userEmail:userInput.userEmail,
            userLogin:userInput.userLogin,
            userSetor:userInput.userSetor,
            userPassword:userInput.userPassword
        })
        const save = await this.repository.save(user)
        return save
    }
    async alterPassword(user: User, newPassword:string): Promise<boolean> {
        user.userPassword = newPassword
        await this.repository.save(user)
        return true
    }
    async findByID(id: string): Promise<User | null> {
        const user = await this.repository.findOneBy({
            id
        })
        return user
    }
    async findByLogin(login: string): Promise<User | null> {
        const user = await this.repository.findOneBy({
            userLogin:login
        })
        return user
    }

    async listPermissions(id: string): Promise<number[] | undefined> {
        const user = await this.repository.findOne({
            where:{id},
            relations:["userPermissions"]
        })
        const permissions = user?.userPermissions.map(n => n.id)
        return permissions
    }

}