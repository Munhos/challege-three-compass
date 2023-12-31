import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSignUpSchema = new Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    birthDate:{
        type:String
    },
    city:{
        type:String
    },
    coutry:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    confirmPassword:{
        type:String
    }
});

const UserSignUp = mongoose.model("UserSignUp", UserSignUpSchema);
export default UserSignUp;