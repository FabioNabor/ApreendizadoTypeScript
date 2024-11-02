import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm"
import iUsuario from "../protocols/usuario"

@Entity({name:"cadastroUsuario"})
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id!:string
    @Column({
        type:"varchar",
        length: 100,
        unique: true
    })
    userLogin:string
    @Column({
        type:"varchar",
        length: 255,
    })
    userEmail:string
    @Column({
        type:"varchar",
        length: 255,
    })
    userName:string
    @Column({
        type:"varchar",
        length: 120,
    })
    userSetor:string
    @Column({
        type:"varchar",
        length: 255,
    })
    userPassword:string

    constructor(usuario:iUsuario) {
        super()
        this.userLogin = usuario.Login
        this.userEmail = usuario.Email
        this.userName = usuario.Name
        this.userSetor = usuario.Setor
        this.userPassword = usuario.Password
    }
}