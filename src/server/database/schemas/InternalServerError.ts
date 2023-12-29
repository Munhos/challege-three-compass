import mongoose from "mongoose";
const {Schema} = mongoose;

const InternalServerErrorSchema = new Schema({
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

const InternalServerError = mongoose.model("InternalServerError", InternalServerErrorSchema);
export default InternalServerError;