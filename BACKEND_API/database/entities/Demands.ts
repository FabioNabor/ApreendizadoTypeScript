import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from "typeorm"
import { User } from "./RegisterUser"
import { statusDemand } from "../Enums"

@Entity({name:"demands"})
export class Demands extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column({
        type:"timestamptz",
        default: () => 'CURRENT_TIMESTAMP'
    })
    dateUpdate:Date

    @Column({
        type:"varchar",
        nullable: false
    })
    nameDemand:string

    @Column({
        type:"varchar",
        nullable: false
        
    })
    descriptionDemand:string

    @Column({
        type: "enum",
        enum: statusDemand,
        default: statusDemand.AGUARDANDO
    })
    statusDemand:statusDemand

    @Column()
    userId:string

    @ManyToOne(() => User, user => user.userDemands)
    user:User
    
}