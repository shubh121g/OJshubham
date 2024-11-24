const mongoose = require('mongoose');

const coursesSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true

    },
    price:{
        type:Number,
        required:true,
       
    },
    duration:{
        type:String,
        required:true,
       
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required:true
    },
    datetime:{
        type:Date,
        default:Date.now
    }
})

coursesSchema.index({instructor :1});
coursesSchema.index({
    name:'text',
    description:'text'
}); 

module.exports = mongoose.model("course",coursesSchema);