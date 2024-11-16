import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from "typeorm"
import { User } from "./RegisterUser"
import { Permission } from "./Permission"

@Entity({name:"userPermissions"})
export class userPermission extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column({
        type:"timestamptz",
        default: () => 'CURRENT_TIMESTAMP'
    })
    dateUpdate:Date

    @ManyToOne(() => Permission, permission => permission.permission)
    permission:Permission

    @ManyToOne(() => User, user => user.userPermissions)
    user:User
}