import axios from "axios"

export const fetchAllEvents = async () => {
    try {
        const res = await axios.get("/api/main/events");
        return res.data.events;
    } catch (err) {
        return err.message || "Ошибка при загрузке";
    }
}