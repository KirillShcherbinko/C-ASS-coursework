import { Schema, model } from "mongoose";

const OrganizationSchema = new Schema({
    // Ссылки на сторонние модели
    applications: { links: [{ type: Schema.Types.ObjectId, ref: "Application" }], default: [] },
    news: { links: [{ type: Schema.Types.ObjectId, ref: "News" }], default: [] },

    // Данные об оранизации
    organizationName: { type: String, required: true },
    address: { type: String, required: true, minlength: 10 },
    description: { type: String, maxlength: 300, default: "" },
    photo: { type: String },
    contacts: { type: String, default: "" }
});

const Organization = model("Organization", OrganizationSchema);
export default Organization;