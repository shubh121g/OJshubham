const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique: true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    marks:{
        type:Number,
        default:0
    }
    

});

module.exports = mongoose.model("user", userSchema);

