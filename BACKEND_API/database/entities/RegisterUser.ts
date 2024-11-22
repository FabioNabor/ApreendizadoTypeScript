import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, BeforeInsert, BeforeUpdate } from "typeorm"
import { userPermission } from "./UserPermission"
import { hash, genSalt } from "bcrypt"
import { Demands } from "./Demands"

@Entity({name:"registerUser"})
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id!:string
    @Column({
        type:"varchar",
        length: 100,
        unique: true,
        nullable: false
    })
    userLogin:string
    @Column({
        type:"varchar",
        length: 255,
        nullable: false
    })
    userEmail:string
    @Column({
        type:"varchar",
        length: 255,
        nullable: false
    })
    userName:string
    @Column({
        type:"varchar",
        length: 120,
        nullable: false
    })
    userSetor:string
    @Column({
        type:"varchar",
        length: 255,
        nullable: false
    })
    userPassword:string

    @OneToMany(() => userPermission, permission => permission.user)
    userPermissions:userPermission[]

    @OneToMany(() => Demands, demand => demand.user)
    userDemands:Demands[]

    @BeforeInsert()
    async hashPassword() {
        const salt = await genSalt(12)
        this.userPassword = await hash(this.userPassword, salt)
    }
    @BeforeUpdate()
    async hashPasswordUpdate() {
        if (this.userPassword) {
            const salt = await genSalt(12)
            this.userPassword = await hash(this.userPassword, salt)
        }
    }

    constructor(
        props?:Partial<User>
    ){
        super();
        Object.assign(this, props)
    }

}