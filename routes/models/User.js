const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    name : {
        type : String,
        default : null
    },
    mobile_no : {
        type : Number,
        unique : true,
        default : null
    }, 
    email_id : {
        type : String,
        unique : true,
        default : null
    },
    dob:{
        type : Date,
        default : null
    },
    address_line_1 : {
        type : String,
        default : null
    },
    address_line_2 : {
        type : String,
        default : null
    },
    avatar : {
        type : String,
        default : null
    },
    login_type:{
        type : String,
        required : false,
        default : null
    }
})


module.exports = User = mongoose.model('user',UserSchema)