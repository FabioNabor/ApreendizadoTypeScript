import express from 'express'
import cors from 'cors'
import { AppDataSource } from '../database/dataSource'


const app = express()


app.use(cors());


app.get('/')


app.listen(3000, async () => {
    console.log("Server iniciado com sucesso!")
    try {
        await AppDataSource;
        console.log("Banco de Dados Carregado com Sucesso!")
    } catch (error) {
        console.log(`Houve algum erro com o banco de dados ${error}`)
    }
})