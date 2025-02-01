import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        minlength:[3,"Name must be at least 3 characters"],
        
        trim:true,
        validate: {
            validator: (v) => v.length > 0,
            message: "fullName is required",
          },
        

    },
    email:{
        type:String,
        minlength:[5,"Email must be at least 5 characters"],
        required:true,
        trim:true,
        unique:true

    },
    password:{
        type:String,
        minlength:[8,"Password must be at least 8 characters"],
        required:true,
        trim:true,

    },
    profilePic:{
        type:String,
        default:"",

    },
},
{timestamps:true}
);

const User = mongoose.model("User",userSchema);
export default User;