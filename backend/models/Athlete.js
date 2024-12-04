import { Schema, model } from "mongoose";

const AthleteSchema = new Schema({
    // Ссылки на сторонние модели
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    applications: [{ type: Schema.Types.ObjectId, ref: "Application" }],

    // Основные данные
    surname: { type: String, required: true },
    name: { type: String, required: true },
    patronymic: { type: String, required: true },
    photo: { type: String },

    // Данные о спорте
    sport: { type: String, required: true },
    sportclub: { type: String },
    achievements: { type: String, maxlength: 300 },
    category: { type: String },
    coach: { type: String },

    // Характеристики
    age: { type: Number, required: true, min: 6, max: 100 },
    gender: { type: String, enum: ["male", "female"], required: true },
    weight: { type: Number },
    height: { type: Number }
});

const Athlete = model("Athlete", AthleteSchema);
export default Athlete;
