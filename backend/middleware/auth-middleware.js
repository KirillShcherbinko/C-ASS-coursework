import jwt from "jsonwebtoken"
import { MY_SECRET } from "../config.js";

// Функция для декодирования jwt токена
const authMiddleware = (req, res, next) => {
    try{
        // Извлекаем токен из заголовка
        const token = req.headers.authorization.split(" ")[1];

        // Проверка на сущестование токена
        if(!token) {
            return res.status(403).json({message: "Токен не найден"});
        }

        // Декодируем данные
        const decodedData = jwt.verify(token, MY_SECRET);
        req.user = decodedData;

        next();

    } catch(e) {
        return res.status(403).json({message: "Ошибка авторизации"});
    }
}

export default authMiddleware;