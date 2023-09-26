const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    lastName:{
        type:String,
        require:true
    },
    initials:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    mobileNumber:{
        type:String,
        require:true
    },
    faculty:{
        type:String,
        require:true
    },
    regNumber:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        require:true
    }


})
module.exports = mongoose.model("User", UserSchema);