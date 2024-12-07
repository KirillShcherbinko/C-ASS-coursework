import User from "../models/User.js";
import Athlete from "../models/Athlete.js";
import Organization from "../models/Organization.js";
import FileService from "../services/file-service.js";

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
    if (!applications || applications.length === 0) {
        throw new Error ("Список заявок пуст");
    }
    return applications;
}

class ProfileService {
    static async getProfile(userId) {
        const user = await checkUser(userId);
        const roleData = checkRoleData(user.roleData);

        return {message: "Данные получены успешно", roleData};
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

        return {message: "Список заявок успешно получен", applications};
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