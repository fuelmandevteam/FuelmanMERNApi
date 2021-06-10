const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({

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
    No_of_workers:{
        type : Number,
        default : null
    },
    workers_name:[
        {
            Name : String
        }
    ],
    shop_address : {
        type : String,
        default : null
    },
    city : {
        type : String,
        default : null
    },
    state : {
        type : String,
        default : null
    },
    shop_licence : {
        type : String,
        default : null
    },
    shop_image : {
        type : Array,
        default : null
    },
    avatar : {
        type : String,
        default : null
    },
    long : {
        type : mongoose.Decimal128,
        default : null
    },
    lat : {
        type : mongoose.Decimal128,
        default : null
    },
    distance_covered : {
        type : Number,
        default : null
    },
    isShop_active : {
        type : String,
        default : null
    }
})


module.exports = Vendor = mongoose.model('vendor',VendorSchema)




