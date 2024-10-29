import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please provide username"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"Please provide email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please provide password"]
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
    


})
// in next js we have to tell that we have to provide reference to this model if not created first time else it will be created
const User =  mongoose.models.users || mongoose.model("users",userSchema)

export default User