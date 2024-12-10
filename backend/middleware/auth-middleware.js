import jwt from "jsonwebtoken"

// Функция для декодирования jwt токена
const authMiddleware = (req, res, next) => {
    try{
        // Извлекаем токен из заголовка
        const token = req.headers.authorization.split(" ")[1];

        // Проверка на сущестование токена
        if(!token) {
            return res.status(403).json({ message: "Токен не найден" });
        }

        // Декодируем данные
        const decodedData = jwt.verify(token, process.env.MY_SECRET);
        req.user = decodedData;

        console.log(req.user);
        next();

    } catch(err) {
        return res.status(403).json({ message: `Ошибка авторизации: ${err.message}` });
    }
}

export default authMiddleware;