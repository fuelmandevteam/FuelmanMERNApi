const mongoose = require('mongoose');

const TwoWheelervechilesSchema = new mongoose.Schema({

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


module.exports = TwoWheeler = mongoose.model('two_wheeler_vechiles',TwoWheelervechilesSchema)