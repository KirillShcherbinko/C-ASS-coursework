import { Schema, model } from "mongoose";

const AthleteSchema = new Schema({
    // Ссылки на сторонние модели
    applications: {links: [{ type: Schema.Types.ObjectId, ref: "Application" }], default: []},

    // Основные данные
    surname: { type: String, required: true },
    firstname: { type: String, required: true },
    patronymic: { type: String, default: "" },
    photo: { type: String },
    contacts: { type: String, default: "" },

    // Данные о спорте
    sport: { type: String, required: true },
    sportclub: { type: String, default: "" },
    achievements: { type: String, maxlength: 300, default: "" },
    category: { type: String, default: "" },
    coach: { type: String, default: "" },

    // Характеристики
    age: { type: Number, required: true, min: 6, max: 100 },
    gender: { type: String, enum: ["male", "female"], required: true },
    weight: { type: Number, default: undefined },
    height: { type: Number, default: undefined }
});

const Athlete = model("Athlete", AthleteSchema);
export default Athlete;
