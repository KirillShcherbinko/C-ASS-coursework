import { validationResult } from "express-validator";
import ProfileService from "../services/profile-service.js";

class ProfileController {
    static async getProfile(req, res) {
        try {
            const profile = await ProfileService.getProfile(req.params.userId);
            return res.status(200).json({message: "Данные получены", profile: profile});
        } catch (err) {
            res.status(500).json({message: err.message || "Ошибка при получении данных"});
        }
    } 

    static async updateProfile(req, res) {
        try {
            const updatedProfile = await ProfileService.updateProfile(req.params.userId, req.body);
            return res.status(200).json({message: "Данные обновлены", profile: updatedProfile});
        } catch (err) {
            res.status(500).json({message: err.message || "Ошибка при обновлении данных"});
        }
    }

    static async getApplications(req, res) {
        try {
            const applications = await ProfileService.getApplications(req.params.userId);
            return res.status(200).json({message: "Заявки получены", applications: applications});
        } catch (err) {
            res.status(500).json({message: err.message || "Ошибка при получении заявок"});
        }
    }

    static async updateApplication(req, res) {
        try {
            // Обработка возможных ошибок
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map(err => err.msg);
                return res.status(400).json({ message: errorMessages });
            }

            const updatedApplication = await ProfileService.updateApplication(req.params.userId, req.body);
            return res.status(200).json({message: "Статус заявки обновлён", application: updatedApplication});
        } catch (err) {
            res.status(500).json({message: err.message || "Ошибка при обновлении статуса заявки"});
        }
    }
}

export default ProfileController;