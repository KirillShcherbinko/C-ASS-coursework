import {Schema, model} from "mongoose";

const UserSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    phonenumber: {type: String, required: true},
    role: {type: String, enum: ["athlete", "organization"], required: true},
    roleData: {type: Schema.Types.ObjectId, refPath: "role", required: true}
});

const User = model("User", UserSchema);
export default User;