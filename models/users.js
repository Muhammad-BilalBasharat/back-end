import mongoose from 'mongoose';
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate:{
            validator:function(v){
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v)
            },
            message:"Invalid email address"
        }
    },
    password:{
        type:String,
        required:true
    },
    profileImage:{
        type:String,
        default:"https://www.w3schools.com/howto/img_avatar.png"
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
    isActive:{
        type:Boolean,
        default:true
    },
    phone:{
        type:String,
        // required:true
    },
    address:{
        type:String,
        // required:true
    }
})
const User= mongoose.model("User",userSchema,"users")
export default User;