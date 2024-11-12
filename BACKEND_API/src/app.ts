import express from 'express'
import cors from 'cors'
import { AppDataSource,  } from '../database/dataSource'
import { routes } from '../routes/UserRoutes';


const app = express()


app.use(cors());

app.use(express.json());

app.use('/api', routes)


AppDataSource.initialize().then(async () => {
    console.log("DataBase Carregada com sucesso!");
    console.log(await AppDataSource.runMigrations());
    app.listen(3030, () => {
        console.log("Server inicializado na porta 3030!")
    })
})

