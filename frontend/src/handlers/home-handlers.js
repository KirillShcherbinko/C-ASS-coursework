import axios from "axios"

export const fetchAllEvents = async () => {
    try {
        const res = await axios.get("/api/main/events");
        return res.data.events;
    } catch (err) {
        return err.message || "Ошибка при загрузке";
    }
}

export const sendApplication = async (eventId) => {
  const token = localStorage.getItem("token");
  return axios.post(
    `/api/main/events/${eventId}/apply`,
    { eventId },
    {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
    }
  );
}