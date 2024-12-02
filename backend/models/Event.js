import {Schema, model} from "mongoose";

const EventSchema = new Schema({
    organizationId: {type: Schema.Types.ObjectId, ref: "Organization", required: true},
    title: {type: String, required: true},
    sport: {type: String, required: true},
    date: {type: Date, required: true},
    location: {type: String, required: true, minlength: 10},
    description: {type: String, maxlength: 300},
    picture: {type: String, required: true}
});

const Event = model("Event", EventSchema);
export default Event;