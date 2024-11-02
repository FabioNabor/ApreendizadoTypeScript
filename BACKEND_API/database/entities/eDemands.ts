import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from "typeorm"
import { User } from "./eUsuario"

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
        type:"varchar",
        length: 150,
        nullable: false
    })
    statusDemands:string

    @ManyToOne(() => User, user => user.userDemands)
    usuario:User
    
}