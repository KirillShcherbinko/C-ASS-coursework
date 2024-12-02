import {PORT} from "./config.js";
import {DB_URL} from "./config.js";

import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
//import authRouter from "./routers/authRouter.js";
//import pinRouter from "./routers/pinRouter.js"


const app = express()

app.use(cors({origin: "*"})) // Настройка cors
app.use(express.json()) // Запросы представлены в формате json
app.use(express.static("static")) // Добавление возможности загружать статические файлы
app.use(fileUpload({})) // Загрузка файлов


// Функция для запуска проекта
async function startApp() {
    try {
        await mongoose.connect( DB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        app.listen(PORT, () => console.log("Server is runnning...."))
    } catch(e) {
        console.error(e)
    }
}

startApp()