const mongoose = require('mongoose');


const ServicesSchema = new mongoose.Schema({
    service_name : {
        type : String,
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
    sub_services_1 : {
        type : Array,
        default : null
    },
    sub_services_2 : {
        type : Array,
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