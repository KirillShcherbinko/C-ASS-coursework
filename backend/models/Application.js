import { Schema, model } from "mongoose";

const ApplicationShema = new Schema({
    athleteId: { type: Schema.Types.ObjectId, ref: "Athlete", required: true },
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    status: {
        type: String, 
        enum: ["pending", "accepted", "rejected"],
        default: "pending" 
    },
    comment: { type: String, maxlength: 300 }
}, { timestamps: true })

const Application = model("Aplication", ApplicationShema);
export default Application;