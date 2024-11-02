import "reflect-metadata"
import { DataSource } from "typeorm"

const connect = new DataSource({
    type: "sqlite",
    database: "./database/database.sqlite",
    synchronize: true,
    logging: false,
    entities: ["./entity/**/*.ts"],
    migrations: ["./database/migration/*.ts"],
    subscribers: [],
})

export const AppDataSource = (async () => {
    if (!connect.isInitialized) { 
        await connect.initialize();
        return connect;
    }
})();