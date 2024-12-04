import { Schema, model } from "mongoose";

const OrganizationSchema = new Schema({
    // Ссылки на сторонние модели
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    applications: [{ type: Schema.Types.ObjectId, ref: "Application" }],
    news: [{ type: Schema.Types.ObjectId, ref: "News" }],

    // Данные об оранизации
    name: { type: String, required: true },
    address: { type: String, required: true, minlength: 10 },
    description: { type: String, maxlength: 300 }
});

const Organization = model("Organization", OrganizationSchema);
export default Organization;