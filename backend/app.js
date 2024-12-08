import {PORT} from "./config.js";
import {DB_URL} from "./config.js";

import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
import authRouter from "./routers/auth-router.js";
import profileRouter from "./routers/profile-router.js";
import mainRouter from "./routers/main-router.js";
//import pinRouter from "./routers/pinRouter.js"


const app = express()

app.use(cors({origin: "*"}));
app.use(express.json());
app.use(express.static("static"));
app.use(fileUpload({}));

app.use("/main", mainRouter);
app.use("/auth", authRouter);
app.use("/profile", profileRouter);
//app.use("/news", newsRouter);


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