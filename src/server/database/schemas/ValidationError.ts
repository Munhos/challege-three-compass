import mongoose from "mongoose";
const { Schema } = mongoose;

const ValidationErrorSchema = new Schema({
    type:{
        type:String
    },
    errors:{
        type:Array
    }
});

const ValidationError = mongoose.model("ValidationError", ValidationErrorSchema);
export default ValidationError;