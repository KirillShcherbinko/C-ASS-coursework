import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Athlete from "../models/Athlete.js";
import Organization from "../models/Organization.js";


// Функция для генерации токена
const generateAccessToken = (id, role) => {
    const payload = { id, role };
    return jwt.sign(payload, process.env.MY_SECRET, { expiresIn: "2h" });
}

class AuthService {
    // Метод для создания нового пользователя
    static async registration(email, password, role, roleData) {

         // Проверка на существования пользователя с таким же именем
        const candidate = await User.findOne({ email });
        if (candidate) {
            throw new Error("Данный адрес электронной почты уже занят");
        }

        // Данные о роли
        let fetchedRoleData;
        
        // Добавление данных в зависимости от роли
        if (role === "athlete") {
            fetchedRoleData = new Athlete({...roleData});
            await fetchedRoleData.save();
        } else if (role === "organization") {
            fetchedRoleData = new Organization({...roleData});
            await fetchedRoleData.save();
        } else {
            throw new Error("Роль указана неверно");
        }

        // Хэширование пароля
        const hashPassword = bcrypt.hashSync(password, 8);

        // Создание нового пользователя
        const user = new User({ 
            email, 
            password: hashPassword, 
            role, 
            roleData: fetchedRoleData._id 
        })
        await user.save();
    } 


    // Метод для осуществления входа в аккаунт
    static async login(email, password) {
        // Поиск пользователя с такими данными в базе
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error(`Адрес электтонной почты ${email} не найден`);
        }

        // Проверка на корректность пароля
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            throw new Error(`Введён неверный пароль ${password}`);
        }

        // Сохраняем токен
        const token = generateAccessToken(user._id, user.role);
        return token;
    }
}

export default AuthService;