const mongoose = require('mongoose');

const testcaseSchema = mongoose.Schema({
    pid:{
        type:String,
        required:true,
       
    },
    inputs:{
        type:String,
        required:true
    },
    outputs:{
        type:String,
        required:true
    }
   
})

module.exports = mongoose.model("testcase",testcaseSchema);