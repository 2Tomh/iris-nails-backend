const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String
    },
    mail:{
        type:String
    },
    phoneNumber:{
        type:Number
    },
    isAdmin:{
        type:Boolean,
        default: false
    }
})



userSchema.pre("save", async function(next){
    const user = this;
   
    if(user.isModified('password')){
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
    }
    next()
})

const User = mongoose.model("user", userSchema);

module.exports = User;