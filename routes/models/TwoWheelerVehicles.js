const mongoose = require('mongoose');

const TwoWheelerVehiclesSchema = new mongoose.Schema({

    manufacturer : {
        type : String,
        default : "",
        require : true
    },
    model : {
        type : String,
        default : "",
        require : true
    }, 
    vechile_type : {
        type : String,
        default : "",
        require : true
    },
    engine_fuel_type : {
        type : String,
        default : "null",
        require : true
    }
})


module.exports = TwoWheelerVehicles = mongoose.model('TwoWheelVehicles',TwoWheelerVehiclesSchema)