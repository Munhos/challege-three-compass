import mongoose from "mongoose";
const { Schema } = mongoose;

const EventInputSchema = new Schema({
    description:{
        type:String
    },
    dayOfWeek:{
        type:String
    }
});

const EventInput = mongoose.model("EventInput", EventInputSchema);
export default EventInput;