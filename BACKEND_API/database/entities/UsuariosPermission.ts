import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from "typeorm"
import { User } from "./Usuario"
import { Permission } from "./Permission"

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