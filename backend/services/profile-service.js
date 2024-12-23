import User from "../models/User.js";
import Athlete from "../models/Athlete.js";
import Organization from "../models/Organization.js";
import Application from "../models/Application.js";
import FileService from "../services/file-service.js";
import { Types } from "mongoose";

// Функция для проверки пользователя
const checkUser = async (userId) => {
    const user = await User.findById(userId).populate("roleData");
    if (!user) {
        throw new Error("Пользователь не найден");
    }
    return user;
}


// Функция для проверки наличия данных о роли
const checkRoleData = (roleData) => {
    if (!roleData) {
        throw new Error("Данные о роли пользователя не найдены");
    }
    return roleData;
}

// Функция для проверки заявок
const checkApplications = (applications) => {
    if (!applications.links || applications.links.length === 0) {
        throw new Error ("Список заявок пуст");
    }
    return applications.links;
}

class ProfileService {
    static async getProfile(userId) {
        const user = await checkUser(userId);
        const roleData = checkRoleData(user.roleData);

        return {message: "Данные получены успешно", role: user.role, roleData};
    }

    static async updateProfile(userId, newData) {
        // Получение данных пользователя с ролью
        const user = await checkUser(userId);
        const roleData = checkRoleData(user.roleData);
    
        // Определение модели роли
        const roleModels = {
            organization: Organization,
            athlete: Athlete,
        };
        
        const roleModel = roleModels[user.role];
        if (!roleModel) {
            throw new Error("Данная модель содержит неверную роль");
        }

        if (roleData.photo && roleData.photo !== "default-image.jpg") {
            FileService.deleteFile(roleData.photo);
        }
    
        // Обновление данных роли
        const updatedRoleData = await roleModel.findByIdAndUpdate(roleData._id, newData, { new: true });
        if (!updatedRoleData) {
            throw new Error("Ошибка при обновлении данных роли");
        }
    
        return updatedRoleData;
    }
    
    

    static async getApplications(userId) {

        const user = await checkUser(userId);
        const roleData = checkRoleData(user.roleData);
        const applications = checkApplications(roleData.applications);

        // Получение данных заявок
        const applicationData = await Promise.all(applications.map(async (application) => {
            if (!Types.ObjectId.isValid(application)) {
                throw new Error(`Invalid application ID: ${application}`);
            }
            return await Application.findById(application);
        }));

        return { message: "Список заявок успешно получен", applicationData };
        
    }

    static async updateApplication(userId, applicationId, status) {

        const user = await checkUser(userId);
        const roleData = checkRoleData(user.roleData);
        const applications = checkApplications(roleData.applications);

        const application = applications.find((application) => {
            return application._id.toString() === applicationId; 
        });

        if (!application) {
            throw new Error("Не удалось получить заявку");
        }

        application.status = status;

        await roleData.save();

        return {message: "Заявка успешно получена", application};
    }
}

export default ProfileService;