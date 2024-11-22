import { LiberyPermissionInputDTO, LiberyPermissionOutputDTO } from "../../DTOs/permission/liberyPermissionDTO";
import { iPermissionRepository } from "../../repository/permission/iPermissionRepository";
import { iUserRepository } from "../../repository/user/iUserRepository";
import { UseCase } from "../UseCase";

export class LiberyPermissionUseCase implements UseCase<LiberyPermissionInputDTO, LiberyPermissionOutputDTO> {

    private constructor(
        private iLiberyPermissionRepository:iPermissionRepository,
        private userRepository:iUserRepository
    ){}

    public static create(iLiberyPermissionRepository:iPermissionRepository, userRepository:iUserRepository) {
        return new LiberyPermissionUseCase(iLiberyPermissionRepository, userRepository)
    }

    async execute(data: LiberyPermissionInputDTO): Promise<LiberyPermissionOutputDTO> {
        const user = await this.userRepository.findByLogin(data.input.login)
        if (!user) throw new Error("Usuário não encontrado");
        const existspermission = await this.iLiberyPermissionRepository.findByID(data.input.id)
        if (!existspermission) throw new Error("Permissão não existe!");
        const perms = await this.userRepository.listPermissions(user.id)
        if (perms?.includes(data.input.id)) throw new Error("Usuário já possui essa permissão!")
        const lib = await this.iLiberyPermissionRepository.libery(user, existspermission)
        if (!lib) throw new Error("Permissão não liberada!");
        const output:LiberyPermissionOutputDTO = {
            output:{
                sucess:true
            }
        }
        return output
    }

}