const mongoose = require('mongoose');

const Two_wheelerSchema = new mongoose.Schema({

    manufacturer : {
        type : String,
        default : null
    },
    model : {
        type : String,
        default : null
    }, 
    vechile_type : {
        type : String,
        default : null
    },
    engine_type : {
        type : String,
        default : null
    }
})


module.exports = Two_wheeler = mongoose.model('two_wheeler',Two_wheelerSchema)