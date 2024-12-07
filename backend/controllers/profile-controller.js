import { validationResult } from "express-validator";
import ProfileService from "../services/profile-service.js";
import FileService from "../services/file-service.js";

class ProfileController {
    static async getProfile(req, res) {
        try {
            const profile = await ProfileService.getProfile(req.user.id);
            return res.status(200).json({message: "Данные получены", profile: profile});
        } catch (err) {
            res.status(500).json({message: err.message || "Ошибка при получении данных"});
        }
    } 

    static async updateProfile(req, res) {
        try {
            // Обработка возможных ошибок
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map(err => err.msg);
                return res.status(400).json({ message: errorMessages });
            }

            // Входные данные
            const newData = req.body;

            // Проверка на недопустимые поля для обновления
            if (newData.applications || newData.email || newData.password || newData.role) {
                throw new Error("Не удалось обновить данные");
            }

            // Изменение фото (если новое фото предоставлено)
            if (req.files.photo) {
                newData.photo = FileService.saveFile(req.files.photo);
            }

            const updatedProfile = await ProfileService.updateProfile(req.user.id, newData);
            return res.status(200).json({message: "Данные обновлены", profile: updatedProfile});
        } catch (err) {
            res.status(500).json({message: err.message || "Ошибка при обновлении данных"});
        }
    }

    static async getApplications(req, res) {
        try {
            const applications = await ProfileService.getApplications(req.user.id);
            return res.status(200).json({message: "Заявки получены", applications: applications});
        } catch (err) {
            res.status(500).json({message: err.message || "Ошибка при получении заявок"});
        }
    }

    static async updateApplication(req, res) {
        try {      
            // Получение данных
            const applicationId = req.params.applicationId;
            const status = req.body.status;

            // Проверка роли
            if (req.user.role !== "organization") {
                throw new Error("Доступ только для организации");
            }

            // Проверка параметров
            if (!applicationId) {
                throw new Error("Неверное значение id заявки");
            }

            // Проверка статуса
            if (status !== "accepted" && status !== "rejected") {
                throw new Error("Неверное значение статуса заявки");
            }

            // Обновление данных
            const updatedApplication = await ProfileService.updateApplication(req.user.id, applicationId, status);
            return res.status(200).json({message: "Статус заявки обновлён", application: updatedApplication});
        } catch (err) {
            res.status(500).json({message: err.message || "Ошибка при обновлении статуса заявки"});
        }
    }
}

export default ProfileController;