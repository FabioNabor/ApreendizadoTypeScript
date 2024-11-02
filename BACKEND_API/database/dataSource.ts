import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./database/database.sqlite",
    synchronize: true,
    logging: false,
    entities: ["./entities/**/*.ts"],
    migrations: ["./database/migration/*.ts"],
    subscribers: [],
})

export const initialize = (async () => {
    if (!AppDataSource.isInitialized) { 
        await AppDataSource.initialize();
        return AppDataSource as DataSource;
    }
})();