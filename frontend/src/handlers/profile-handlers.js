import axios from "axios";

export const fetchUserProfile = async () => {
    try {
        const token = localStorage.getItem("token");
        const res = axios.get(
            "/api/profile/users",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );
        return (await res).data.profile;
    } catch(err) {
        return err.message || "Ошибка при получении данных пользователя"
    }
} 

export const fetchUserApplications = async () => {
    try {
        const token = localStorage.getItem("token");
        const res = axios.get(
            "/api/profile/users/applications",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );
        return (await res).data.applications;
    } catch(err) {
        return err.message || "Ошибка при получении заявок пользователя"
    }
}

export const updateUserProfile = async () => {

}

export const updateApplicationStatus = async (applicationId) => {

}