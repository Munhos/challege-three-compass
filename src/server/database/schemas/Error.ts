import mongoose from "mongoose";
const {Schema} = mongoose;

const errorSchema = new Schema({
    statusCode:{
        type:Number
    },
    error:{
        type:String
    },
    message:{
        type:String
    }
})

const Error = mongoose.model("Error", errorSchema);
export default Error;