import { Entity, Column, PrimaryGeneratedColumn, BaseEntity,OneToMany } from "typeorm"
import { userPermission } from "./UsuariosPermission"

@Entity({name:"permissions"})
export class Permission extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column({
        type:"timestamptz",
        default: () => 'CURRENT_TIMESTAMP'
    })
    dataAtulizacao:Date

    @Column({
        type:"varchar",
        nullable: false
    })
    permissionDescricao:string

    @OneToMany(() => userPermission, permissao => permissao.permission)
    permission:userPermission[]
}