import jwt from "jsonwebtoken";

// Функция для проверки токена
const verifyToken = (token, secret) => {
    if (!token) {
        throw new Error("Токен не найден");
    }

    try {
        return jwt.verify(token, secret);
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            throw new Error("Срок действия токена истёк");
        }
        throw new Error("Некорректный токен");
    }
};

// Middleware для авторизации
const authMiddleware = (req, res, next) => {
  try {
    // Извлекаем токен из заголовка
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "Токен не найден" });
    }

    // Проверяем токен
    const decodedData = verifyToken(token, process.env.MY_SECRET);
    req.user = decodedData;
    console.log(req.user);
    next();
  } catch (err) {
    return res.status(403).json({ message: `Ошибка авторизации: ${err.message}` });
  }
};

export default authMiddleware;
