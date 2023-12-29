import mongoose from "mongoose";
const {Schema} = mongoose;

const UserSchema = new Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    }
})

const User = mongoose.model("User", UserSchema);
export default User;