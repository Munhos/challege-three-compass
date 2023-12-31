import mongoose from "mongoose";
const { Schema } = mongoose;

const UnauthorizedErrorSchema = new Schema({
    statusCode:{
        type:Number
    },
    error:{
        type:String
    },
    message:{
        type:String
    }
});

const UnauthorizedError = mongoose.model("UnauthorizedError", UnauthorizedErrorSchema);
export default UnauthorizedError;