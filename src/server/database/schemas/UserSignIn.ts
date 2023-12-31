import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSignInSchema = new Schema({
    email:{
        type:String
    },
    password:{
        type:String
    }
});

const UserSignIn = mongoose.model("UserSignIn", UserSignInSchema);
export default UserSignIn;