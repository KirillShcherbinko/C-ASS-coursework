import { check } from "express-validator";

    // Метод для валидации данных при регистрации
    const validateRegistrationMiddleware = async (req, res, next) => {
        // Массив для динамически добавляемых проверок
        const validations = [
            // Общие проверки
            check("email", "Введите корректный адрес электронной почты")
                .isEmail(),
            check("password", "Пароль должен быть длиной от 4 до 12 символов")
                .isLength({ min: 4, max: 12 }),
            check("role", "Неверное значение роли")
                .isIn(["athlete", "organization"])
        ];

        // Добавляем проверки в зависимости от роли
        if (req.body.role === "athlete") {
            validations.push(
                check("surname", "Поле фамилия не может быть пустым")
                    .notEmpty(),
                check("surname", "Поле фамилия: допустимы только русские буквы, первая буква - заглавная")
                    .matches("^[А-Я][а-я]+$"),
                check("firstname", "Поле имя не может быть пустым")
                    .notEmpty(),
                check("firstname", "Поле имя: допустимы только русские буквы, первая буква - заглавная")
                    .matches("^[А-Я][а-я]+$"),
                check("patronymic", "Поле отчество: допустимы только русские буквы, первая буква - заглавная")
                    .optional().matches("^[А-Я][а-я]+$"),
                check("sport", "Поле спорт обязательно")
                    .notEmpty(),
                check("achievements", "Достижения: число символов от 10 до 300")
                    .optional().isLength({min: 10, max: 300}),
                check("age", "Поле возраст обязательно")
                    .notEmpty(),
                check("age", "Недопустимый возраст")
                    .isInt({min: 6, max: 100}),
                check("gender", "Поле пол не модет быть пустым")
                    .notEmpty(),
                check("gender", "В России могут быть только два пола")
                    .isIn(["male", "female"])
            );
        } else if (req.body.role === "organization"){
            validations.push(
                check("organizationName", "Поле название организации не может быть пустым")
                    .notEmpty(),
                check("address", "Поле адрес организации не может быть пустым")
                    .notEmpty(),
                check("address", "Адрес: число символов от 10 до 300")
                    .isLength({min: 10, max: 300}),
                check("description", "Описание: число символов от 10 до 300")
                    .optional().isLength({min: 10, max: 300}),
            );
        }

        for (let validation of validations) {
            await validation.run(req);
        }

        next();
    }

    const validateOptionalMiddleware = async (req, res, next) => {
        const validations = [];
        if (req.user.role === "athlete") {
            validations.push(
                check("surname", "Поле фамилия: допустимы только русские буквы, первая буква - заглавная")
                    .optional().matches("^[А-Я][а-я]+$"),
                check("firstname", "Поле имя: допустимы только русские буквы, первая буква - заглавная")
                    .optional().matches("^[А-Я][а-я]+$"),
                check("patronymic", "Поле отчество: допустимы только русские буквы, первая буква - заглавная")
                    .optional().matches("^[А-Я][а-я]+$"),
                check("achievements", "Достижения: число символов от 10 до 300")
                    .optional().isLength({min: 10, max: 300}),
                check("age", "Недопустимый возраст")
                    .optional().isInt({min: 6, max: 100}),
                check("gender", "В России могут быть только два пола")
                    .optional().isIn(["male", "female"])
            );
        } else if (req.user.role === "organization") {
            validations.push(
                check("address", "Адрес: число символов от 10 до 300")
                    .optional().isLength({min: 10, max: 300}),
                check("description", "Описание: число символов от 10 до 300")
                    .optional().isLength({min: 10, max: 300})
            )
        } else {
            return res.status(400).json({message: "Указана неверная роль"});
        }

        for (let validation of validations) {
            await validation.run(req);
        }

        next();
    }

    const validateEventMiddleware = async (req, res, next) => {
        const validations = [];
        if (req.user.role === "organization") {
            validations.push(
                check("title", "Поле название события не может быть пустым")
                    .notEmpty(),
                check("description", "Описание: число символов от 10 до 300")
                    .optional().isLength({min: 10, max: 300}),
                check("sport", "Поле спорт не может быть пустым")
                    .notEmpty(),
                check("date", "Поле дата не может быть пустым")
                    .notEmpty(),
                check("location", "Поле место события не может быть пустым")
                    .notEmpty(),
                check("location", "Место события: число символов от 10 до 300")
                    .isLength({min: 10, max: 300})
            );
        } else {
            return res.status(400).json({message: "Указана неверная роль"});
        }

        for (let validation of validations) {
            await validation.run(req);
        }

        next();
    }

    const validateApplicationMiddleware = (req, res, next) => {

    }

export { 
    validateRegistrationMiddleware, 
    validateOptionalMiddleware, 
    validateEventMiddleware, 
    validateApplicationMiddleware 
};
