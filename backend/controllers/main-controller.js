import MainService from "../services/main-service.js";
import FileService from "../services/file-service.js";
import { validationResult } from "express-validator";


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
            console.log(req.params);
            if (!req.user || req.user.role !== "athlete") {
                return res.status(403).json({message: "Доступ только для спортсменов"});       
            }
            const event = await MainService.createApplication(req.user.id, req.params.eventId);
            res.status(201).json({message: "Заявка принята", event});
        } catch(err) {
            res.status(500).json({message: err.message || "Не удалось создать событие"});
        }
    }
}

export default MainController;