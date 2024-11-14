import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from "typeorm"
import { User } from "./Usuario"
import { statusDemand } from "../Enums"

@Entity({name:"usuariosDemandas"})
export class Demandas extends BaseEntity {
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
    nameDemand:string

    @Column({
        type:"varchar",
        nullable: false
        
    })
    descricaoDemands:string

    @Column({
        type: "enum",
        enum: statusDemand,
        default: statusDemand.AGUARDANDO
    })
    statusDemands:statusDemand

    @Column()
    usuarioId:string

    @ManyToOne(() => User, user => user.usuariosDemandas)
    usuario:User
    
}