
import { RemovePermissionInputDTO, RemovePermissionOutputDTO } from "../../DTOs/permission/RemovePermissionDTO";
import { iPermissionRepository } from "../../repository/permission/iPermissionRepository";
import { iUserRepository } from "../../repository/user/iUserRepository";
import { UseCase } from "../UseCase";

export class RemovePermissionUseCase implements UseCase<RemovePermissionInputDTO, RemovePermissionOutputDTO> {

    private constructor(
        private iRemovePermissionRepository:iPermissionRepository,
        private userRepository:iUserRepository
    ){}

    public static create(iRemovePermissionRepository:iPermissionRepository, userRepository:iUserRepository) {
        return new RemovePermissionUseCase(iRemovePermissionRepository, userRepository)
    }

    async execute(data: RemovePermissionInputDTO): Promise<RemovePermissionOutputDTO> {
        const user = await this.userRepository.findByLogin(data.input.login)
        if (!user) throw new Error("Usuário não encontrado");
        const existspermission = await this.iRemovePermissionRepository.findByID(data.input.id)
        if (!existspermission) throw new Error("Permissão não existe!");
        const perms = await this.userRepository.listPermissions(user.id)
        if (!perms?.includes(data.input.id)) throw new Error("Usuário não possui essa permissão!")
        const lib = await this.iRemovePermissionRepository.remove(user, existspermission)
        if (!lib) throw new Error("Permissão não removida!");
        const output:RemovePermissionOutputDTO = {
            output:{
                sucess:true
            }
        }
        return output
    }

}