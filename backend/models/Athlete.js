import { Schema, model } from "mongoose";

const AthleteSchema = new Schema({
    // Ссылки на сторонние модели
    applications: {links: [{ type: Schema.Types.ObjectId, ref: "Application" }], default: []},

    // Основные данные
    surname: { type: String, required: true },
    firstname: { type: String, required: true },
    patronymic: { type: String },
    photo: { type: String, default: "default-image.jpg" },
    contacts: { type: String },

    // Данные о спорте
    sport: { type: String, required: true},
    sportclub: { type: String },
    achievements: { type: String, maxlength: 300 },
    category: { type: String },
    coach: { type: String },

    // Характеристики
    age: { type: Number, required: true }, 
    gender: { type: String, required: true },
    weight: { type: Number },
    height: { type: Number }
});

const Athlete = model("Athlete", AthleteSchema);
export default Athlete;
