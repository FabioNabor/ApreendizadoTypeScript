import { Entity, Column, PrimaryGeneratedColumn, BaseEntity,OneToMany } from "typeorm"
import { userPermission } from "./UserPermission"

@Entity({name:"permissions"})
export class Permission extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column({
        type:"varchar",
        length:150,
        nullable: false
    })
    permissionModule:string

    @Column({
        type:"varchar",
        length:150,
        nullable: false
    })
    permissionName:string
    
    @Column({
        type:"timestamptz",
        default: () => 'CURRENT_TIMESTAMP'
    })
    dataUpdate:Date

    @Column({
        type:"varchar",
        nullable: false
    })
    permissionDescription:string

    @OneToMany(() => userPermission, permissao => permissao.permission)
    permission:userPermission[]
}