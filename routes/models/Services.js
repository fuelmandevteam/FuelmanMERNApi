const mongoose = require('mongoose');


const ServicesSchema = new mongoose.Schema({
    affected_area :{
        type : String,
        default : null
    },
    service_names : {
        type : Array,
        default : null
    },
    service_type : {
        type : String,
        default : null
    },
    icon_url : {
        type : String,
        default : null
    },
    is_two_wheel : {
        type : Boolean,
        default : false
    },
    is_four_wheel : {
        type : Boolean,
        default : false
    }
})
 

module.exports = Services = mongoose.model('Services',ServicesSchema);