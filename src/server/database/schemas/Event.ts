import mongoose from "mongoose";
const { Schema } = mongoose;

const EventSchema = new Schema({
    _id:{
        type:String
    },
    description:{
        type:String
    },
    dayOfWeek:{
        type:String
    },
    userId:{
        type:String
    }
});

const Event = mongoose.model("Event", EventSchema);
export default Event;