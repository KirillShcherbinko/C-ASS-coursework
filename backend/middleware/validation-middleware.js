import { check } from "express-validator";

const validateData = async (req, res, next) => {
    // Массив для динамически добавляемых проверок
    const validations = [
        // Общие проверки
        check("email", "Введите корректный адрес электронной почты").isEmail(),
        check("password", "Пароль должен быть длиной от 4 до 12 символов").isLength({ min: 4, max: 12 })
    ];

    // Добавляем проверки в зависимости от роли
    if (req.body.role === "athlete") {
        validations.push(
            check("surname", "Некорректное значение фамилии").matches("^[А-Я][а-я]+$"),
            check("firstname", "Некорректное значение имени").matches("^[А-Я][а-я]+$"),
            check("patronymic", "Некорректное значение отчества").matches("^[А-Я][а-я]+$"),
        );
    } else if (req.body.role === "organization") {
        validations.push(
            check("organizationName", "Некорректное значение названия организации").notEmpty(),
            check("organizationAddress", "Некорректное значение адреса").notEmpty()
        );
    } else {
        return res.status(400).json({ message: "Некорректное значение роли" });
    }

    for (let validation of validations) {
        await validation.run(req);
    }

    next();
};

export default validateData;
