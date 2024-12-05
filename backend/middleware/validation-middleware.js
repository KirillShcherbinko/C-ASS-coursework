import { check } from "express-validator";

const validateData = (req, res, next) => {
    
    // Обрабатываем общие поля
    check("email", "Введите корректный адрес электронной почты").isEmail();
    check("password", "Пароль должен быть длиной от 4 до 12 символов").isLength({min: 4, max: 12});

    // Обрабатываем поля в зависимости от роли
    if (req.body.role === "athlete") {
        check("surname", "Некорректное значение фамилии").matches("^[А-Я][а-я]+$");
        check("name", "Некорректное значение имени").matches("^[А-Я][а-я]+$");
        check("patronymic", "Некорректное значение отчества").matches("^[А-Я][а-я]+$");
    } else if (req.body.role === "organization") {
        check("name", "Название компании не может быть пустым").notEmpty();
    } else {
        return res.status(400).json({ message: "Некорректное значение роли" });
    }

    next();
}

export default validateData;