import { validationResult } from "express-validator"
import AuthService from "../services/authService.js"

class AuthController {
    // Метод для обработки регистрации
    static async registration(req, res) {
        try {
            // Обработка возможных ошибок
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map(err => err.msg);
                return res.status(400).json({ message: errorMessages });
            }

            // Создаём нового пользователя
            const { email, password, role, ...roleData } = req.body
            await AuthService.registration(email, password, role, roleData);

            res.status(201).json({ message: "Успешная регистрация" })

        } catch(err) {
            res.status(400).json({message: err.message || "Ошибка регистрации"})
        }
    }

    // Метод для обработки входа в аккаунт
    static async login(req, res) {
        try {
            // Осуществляем вход в аккаунт
            const {email, password} = req.body
            const token = await AuthService.login(email, password)

            // Сообщаем об успешом входе в аккаунт
            res.status(200).json({
                message: "Успешный вход в аккаунт", 
                token: token
            })

        } catch(err) {
            // Сообщаем пользователю об ошибке входа
            res.status(401).json({message: err.message || "Не авторизован"})
        }
    }

}

export default AuthController