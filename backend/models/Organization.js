import { Schema, model } from "mongoose";

const OrganizationSchema = new Schema({
    // Ссылки на сторонние модели
    applications: { links: [{ type: Schema.Types.ObjectId, ref: "Application" }], default: [] },
    news: { links: [{ type: Schema.Types.ObjectId, ref: "News" }], default: [] },

    // Данные об оранизации
    organizationName: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String },
    photo: { type: String, default: "default-image.jpg" },
    contacts: { type: String }
});

const Organization = model("organization", OrganizationSchema);
export default Organization;