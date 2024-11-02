import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from "typeorm"
import { User } from "./eUsuario"
import { Permission } from "./ePermission"

@Entity({name:"usuariosPermission"})
export class userPermission extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column({
        type:"timestamptz",
        default: () => 'CURRENT_TIMESTAMP'
    })
    dataAtulizacao:Date

    @ManyToOne(() => Permission, permission => permission.permission)
    permission:Permission

    @ManyToOne(() => User, user => user.userDemands)
    user:User
}