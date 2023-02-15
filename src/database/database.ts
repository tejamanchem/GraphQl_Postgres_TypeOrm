import { Task } from "../entities/Task"
import { DataSource } from "typeorm"

export async function dataBase(){
    const AppDataSource = new DataSource({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "Dhan1234!",
        database: "graphQl",
        synchronize: true,
        logging: true,
        entities: [Task]
    })

    await AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")  
        return AppDataSource
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

    
}