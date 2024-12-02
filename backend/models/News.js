import {Schema, model} from mongoose;

const NewsSchema = new Schema({
    organizationId: {type: Schema.Types.ObjectId, ref: "Organization", required: true},
    title: {type: String, required: true},
    description: {type: String, maxlength: 300},
    picture: {type: String, required: true}
});

const News = model("News", NewsSchema);
export default News;