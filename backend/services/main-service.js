import Event from "../models/Event.js";
import Application from "../models/Application.js";
import FileService from "./file-service.js";

class MainService {
    static async getAllEvents() {
        try {
            const events = await Event.find();
            return events;
        } catch(err) {
            throw new Error("Не удалось получить события");
        }
    }

    static async createEvent(userId, eventData) {
        const event = Event.create({organizationId: userId, ...eventData});
        return event;
    }
}

export default MainService;