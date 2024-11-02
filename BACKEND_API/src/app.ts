import express from 'express'
import cors from 'cors'
import { AppDataSource,  } from '../database/dataSource'


const app = express()


app.use(cors());

app.use(express.json());

app.get('/')


AppDataSource.initialize().then(async () => {
    console.log("DataBase Carregada com sucesso!");
    app.listen(3030, () => {
        console.log("Server inicializado na porta 3030!")
    })
})

