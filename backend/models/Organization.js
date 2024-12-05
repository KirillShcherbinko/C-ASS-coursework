import { Schema, model } from "mongoose";

const OrganizationSchema = new Schema({
    // Ссылки на сторонние модели
    applications: { links: [{ type: Schema.Types.ObjectId, ref: "Application" }], default: [] },
    news: { links: [{ type: Schema.Types.ObjectId, ref: "News" }], default: [] },

    // Данные об оранизации
    organizationName: { 
        type: String, 
        required: [true, "Поле название организации обязательно"] },
    address: { 
        type: String, 
        required: [true, "Поле адрес обязательно"], 
        minlength: [10, "Слишком короткий адрес для такой крупной компании"] 
    },
    description: { 
        type: String, 
        maxlength: [300, "Слишком много букв"], 
        default: "" },
    photo: { type: String, default: "default.jpg" },
    contacts: { type: String, default: "" }
});

const Organization = model("Organization", OrganizationSchema);
export default Organization;