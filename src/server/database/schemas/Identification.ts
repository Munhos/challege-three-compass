import mongoose from "mongoose";
const { Schema } = mongoose;

const IdentificationSchema = new Schema({
    _id:{
        type:String
    }
});

const Identification = mongoose.model("UIdentification", IdentificationSchema);
export default Identification;