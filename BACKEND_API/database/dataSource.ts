import "reflect-metadata"
import { DataSource } from "typeorm"
import 'dotenv/config'

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_URL,
    port: 5432, 
    username: "postgres",
    password: process.env.PASSWORD,
    database: "GerenciadorGeral",
    synchronize: true,
    logging: false,
    entities: ["./database/entities/*.ts"],
    migrations: ["./database/migration/*.ts"],
})

