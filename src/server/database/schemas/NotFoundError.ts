import mongoose from "mongoose";
const { Schema } = mongoose;

const notFoundErrorSchema = new Schema({
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

const notFoundError = mongoose.model("notFoundError", notFoundErrorSchema);
export default notFoundError;