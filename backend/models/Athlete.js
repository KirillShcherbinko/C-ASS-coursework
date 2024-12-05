import { Schema, model } from "mongoose";

const AthleteSchema = new Schema({
    // Ссылки на сторонние модели
    applications: {links: [{ type: Schema.Types.ObjectId, ref: "Application" }], default: []},

    // Основные данные
    surname: { type: String, required: true },
    firstname: { type: String, required: true },
    patronymic: { type: String, required: true },
    photo: { type: String, default: "default.jpg" },
    contacts: { type: String, default: "" },

    // Данные о спорте
    sport: { type: String, required: [true, "Поле спорт обязательно"] },
    sportclub: { type: String, default: "" },
    achievements: { type: String, maxlength: 300, default: "" },
    category: { type: String, default: "" },
    coach: { type: String, default: "" },

    // Характеристики
    age: { 
        type: Number,
        required: [true, "Поле возраст обязательно"], 
        min: [6, "Вы слишком молоды"], 
        max: [100, "Люди столько не живут"]
    },
    
    gender: { 
        type: String, 
        enum: {
            values: ["male", "female"],
            message: "В России есть только два пола"
        }, 
        required: [true, "Поле пол обязательно"] },

    weight: { type: Number, default: undefined },
    height: { type: Number, default: undefined }
});

const Athlete = model("Athlete", AthleteSchema);
export default Athlete;
