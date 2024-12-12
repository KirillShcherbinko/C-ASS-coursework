import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
import authRouter from "./routers/auth-router.js";
import profileRouter from "./routers/profile-router.js";
import mainRouter from "./routers/main-router.js";

dotenv.config();

const app = express()

app.use(cors({origin: "*"}));
app.use(express.json());
app.use(express.static("static"));
app.use(fileUpload({}));

app.use("/main", mainRouter);
app.use("/auth", authRouter);
app.use("/profile", profileRouter);

const PORT = process.env.PORT || 5000;
console.log(process.env);
// Функция для запуска проекта
async function startApp() {
    try {
        await mongoose.connect( process.env.DB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        app.listen(PORT, () => console.log(`Server is runnning on port ${PORT}`));
    } catch(e) {
        console.error(e)
    }
}

startApp()