import MainService from "../services/main-service.js";
import FileService from "../services/file-service.js";
import { validationResult } from "express-validator";
import User from "../models/User.js";
import Application from "../models/Application.js";


class MainController {
    static async getAllEvents(req, res) {
        try {
            const events = await MainService.getAllEvents();
            console.log(`Отработал бэкенд на порту ${process.env.PORT}`);
            return res.status(200).json({message: "События успешно получены", events});
        } catch (err) {
            res.status(500).json({message: err.message || "Ошибка при получении событий"});
        }
        
    }

    static async createEvent(req, res) {
        try {
            // Обработка возможных ошибок
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map(err => err.msg);
                return res.status(400).json({ message: errorMessages });
            }

            if (!req.user || req.user.role !== "organization") {
                return res.status(403).json({message: "Доступ только для организации"});       
            }

            if (req.files && req.files.photo) {
                req.body.photo = FileService.saveFile(req.files.photo);
            }

            const event = await MainService.createEvent(req.user.id, req.body);
            res.status(201).json({message: "Событие успешно создано", event})
        } catch(err) {
            res.status(500).json({message: err.message || "Не удалось создать событие"});
        }
    }

    static async createApplication(req, res) {
        try {
            // Проверяем роль пользователя
            if (!req.user || req.user.role !== "athlete") {
                return res.status(403).json({ message: "Доступ только для спортсменов" });
            }
    
            const userId = req.user.id;
            const eventId = req.body.eventId;
    
            // Получаем пользователя из базы данных и пополняем данные о заявках, если роль athlete
            const user = await User.findById(userId).populate("roleData");

            // Проверяем, что у пользователя есть роль и данные по заявкам
            if (!user.roleData) {
                return res.status(400).json({ message: "Отсутствуют данные о заявках для этой роли" });
            }

            // Проверка на существование заявок у спортсмена (если у него роль "athlete")
            if (user.role === "athlete" && user.roleData.applications && user.roleData.applications.links.length !== 0) {
                // Преобразуем все ObjectId в строку и проверяем на существование заявки с eventId
                const isAlreadyApplied = await Promise.all(user.roleData.applications.links.map(async (applicationId) => {
                    const application = await Application.findById(applicationId); // Ищем заявку по ID
                    return application && application.eventId.toString() === eventId.toString(); // Сравниваем eventId в заявке
                }));

                // Если найдена хотя бы одна заявка, которая уже подана на это событие
                if (isAlreadyApplied.includes(true)) {
                    return res.status(400).json({ message: "Заявка уже существует на это событие" });
                }
            }
        
            // Создаём новую заявку
            const event = await MainService.createApplication(userId, eventId);
            res.status(201).json({ message: "Заявка принята", event });
        } catch (err) {
            res.status(500).json({ message: err.message || "Не удалось подать заявку" });
        }
    }
    
}

export default MainController;