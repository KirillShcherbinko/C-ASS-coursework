import { Schema, model } from "mongoose";

const EventSchema = new Schema({
    // Ссылки на сторонние модели
    organizationId: { type: Schema.Types.ObjectId, ref: "Organization", required: true },

    // Описание
    title: { type: String, required: true },
    description: { type: String, maxlength: 300 },

    // Данные для ориентации пользователей
    sport: { type: String, required: true, index: true },
    date: { type: Date, required: true, index: true },
    location: { type: String, required: true, minlength: 10 },
    picture: { type: String },

    // Варианты фильтрации
    minAge: { type: Number },
    maxAge: { type: Number },
    minWeight: { type: Number },
    maxWeight: { type: Number },
    minHeight: { type: Number },
    maxHeight: { type: Number }
}, { timestamps: true });

const Event = model("Event", EventSchema);
export default Event;
