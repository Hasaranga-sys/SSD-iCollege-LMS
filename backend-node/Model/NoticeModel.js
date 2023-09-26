const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoticeSchema = new Schema({
    faculty:{
        type:String,
       
    },
    date:{
        type:String,
       
    },
    topic:{
        type:String,
        
    },
    notice:{
        type:String,
        
    }
})
module.exports = mongoose.model("Notice",NoticeSchema);