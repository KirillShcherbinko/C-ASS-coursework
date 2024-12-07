import User from "../models/User";
import Athlete from "../models/Athlete";
import Organization from "../models/Organization";
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
        return {message: "Список заявок пуст"};
    }
    return applications;
}

class ProfileService {
    static async getProfile(userId) {
        const user = checkUser(userId);
        const roleData = checkRoleData(user.roleData);

        return {message: "Данные получены успешно", roleData};
    }

    static async updateProfile(userId, newData) {
        // Получение данных пользователя
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("Пользователь не найден");
        }
    
        // Получение ссылки на роль
        let roleModel;
        if (user.role === "organization") {
            roleModel = Organization;
        } else if (user.role === "athlete") {
            roleModel = Athlete;
        } else {
            throw new Error("Данная модель содержит неверную роль");
        }

        // Измнение фото
        if (newData.photo) {
            newData.photo = FileService.saveFile(newData.photo);
            if (user.roleData.photo !== "default.jpg") {
                FileService.deleteFile(user.roleData.photo);
            }
        }
    
        // Получение и обновление данных роли
        const updatedRoleData = await roleModel.findByIdAndUpdate(user.roleData, newData, { new: true });
        if (!updatedRoleData) {
            throw new Error("Ошибка при обновлении данных роли");
        }
    
        return updatedRoleData;
    }
    

    static async getApplications(userId) {

        const user = checkUser(userId);
        const roleData = checkRoleData(user.roleData);
        const applications = checkApplications(roleData.applications);

        return {message: "Список заявок успешно получен", applications};
    }

    static async updateApplication(userId, applicationId, status) {

        const user = checkUser(userId);
        const roleData = checkRoleData(user.roleData);
        const applications = checkApplications(roleData.applications);

        const application = applications.find((application) => {
            return application._id.toString() === applicationId; 
        });

        if (!application) {
            throw new Error("Не удалось получить заявку");
        }

        application.status = status;

        await user.roleData.save();

        return {message: "Заявка успешно получена", application};
    }
}

export default ProfileService;