import {Schema, model} from "mongoose";

const OrganizationSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    name: {type: String, required: true},
    address: {type: String, required: true, minlegth: 10},
    description: {type: String, maxlength: 300}
});

const Organization = model("Organization", OrganizationSchema);
export default Organization;