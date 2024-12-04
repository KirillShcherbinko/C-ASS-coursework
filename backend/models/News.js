import { Schema, model } from mongoose;

const NewsSchema = new Schema({
    // Ссылки на сторонние модели
    organizationId: { type: Schema.Types.ObjectId, ref: "Organization", required: true },

    // Описание
    title: { type: String, required: true },
    description: { type: String, minlength: 50, maxlength: 500, required: true },
    picture: { type: String }
}, { timestamps: true });

const News = model("News", NewsSchema);
export default News;