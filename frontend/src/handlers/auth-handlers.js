import axios from "axios";

export const registrationHandler = async (data, router) => {
    try {
        const res = await axios.post("/api/auth/registration", data);
        router.push("/auth/login");
        return res;
    } catch (err) {
        return err.response?.data?.message || "Ошибка при регистрации"
    }
}

export const loginHandler = async (email, password, router) => {
    try {
        const data = { email, password }
        const res = await axios.post('/api/auth/login', data);
        const token = res.data?.token;
        if (token) {
            localStorage.setItem("token", token)
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            throw new Error("Токен отсутствует")
        }
        router.push("/");
    } catch (err) {
        return err.response?.data?.message || "Ошибка при входе";
    }
}