import Event from "../models/Event.js";
import User from "../models/User.js";
import Application from "../models/Application.js";

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
        const event = await Event.create({organizationId: userId, ...eventData});
        await event.save();
        return event;
    }

    static async createApplication(userId, eventId) {
        const athlete = await User.findById(userId).populate("roleData");
        if (!athlete) {
            throw new Error("Атлет не найден");
        }        
        const event = await Event.findById(eventId);
        if (!event) {
            throw new Error("Событие не найдено");
        }
        const organization = await User.findById(event.organizationId).populate("roleData");
        if (!organization) {
            throw new Error("Организация не найдена");
        }
        const application = await Application.create({athleteId: userId, eventId});
        console.log(athlete.roleData);

        athlete.roleData.applications.links.push(application._id);
        organization.roleData.applications.links.push(application._id);

        await application.save();
        await athlete.roleData.save();
        await organization.roleData.save();

        return application;
    }
}

export default MainService;