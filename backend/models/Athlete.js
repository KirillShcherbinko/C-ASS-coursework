import {Schema, model} from "mongoose";

const AthleteSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    surname: {type: String, required: true},
    name: {type: String, required: true},
    patronymic: {type: String, required: true},
    age: {type: Number, required: true, min: 6, max: 100},
    gender: {type: String, required: true},
    sport: {type: String, required: true},
    sportclub: {type: String},
    category: {type: String},
    achievements: {type: String, maxlength: 300}
});

const Athlete = model("Athlete", AthleteSchema);
export default Athlete;