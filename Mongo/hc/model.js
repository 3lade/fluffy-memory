const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    instructor:{
        type:String,
        required:true
    },
    mail:{
        type:String,
        match:[ghhyhht,""]
    },
    description:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model("Course",courseSchema);