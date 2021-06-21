const express = require('express')
const router = express.Router()
const { check, validationResult} = require('express-validator');
const TwoWheelerVehicles = require('../models/TwoWheelerVehicles')

router.get('/',(req,res)=>{
    res.send('twowheeler Route');
})


// @route    GET /api/twowheelervehicles
// @desc     Get Two Wheel Data By Params
// @access   Public
router.get('/gettwowheels/',
async(req,res) =>{
    try {
        TwoWheelerVehicles.find({}, function(err, data){
            if (err){
                res.status(409).send({
                    results : null,
                    errors : err.message
                })
            }
            if (data) {
                res.status(200).send({
                    results : data,
                    errors : null
                })
            }
          });
    } catch (err) {
        res.status(409).send({
            results : null,
            errors : err
        })
    }
})


// @route    POST /api/twowheelervehicles
// @desc     Add new Two Wheel Entry 
// @access   Public
router.post('/addnewtwowheel',
async(req,res) =>{
    const{manufacturer,model,vechile_type,engine_fuel_type} = req.body;
    
    if (manufacturer == undefined || model == undefined|| vechile_type == undefined||engine_fuel_type == undefined) {
        res.status(400).send({
            errors : 'all fields are mandetory'
        })
    } else if (manufacturer == undefined) {
        res.status(400).send({
            errors : 'manufacturer fields is mandetory'
        })
    }else if (model == undefined) {
        res.status(400).send({
            errors : 'manufacturer fields is mandetory'
        })
    } else if (vechile_type == undefined) {
        res.status(400).send({
            errors : 'manufacturer fields is mandetory'
        })
    }else if (engine_fuel_type == undefined) {
        res.status(400).send({
            errors : 'manufacturer fields is mandetory'
        })
    }else{
        try{
            if ((vechile_type != 'M' && vechile_type != 'S')) {
                res.status(400).send({
                    results : null,
                    errors : `vehicle type should be M or S`
                });
            }
            if ((engine_fuel_type != "P" && engine_fuel_type != "E")) {
                res.status(400).send({
                    results : null,
                    errors : `engine_fuel_type should be P or E`
                });
            }


            let twowheelervehicles = new TwoWheelerVehicles();
            twowheelervehicles.manufacturer = manufacturer;
            twowheelervehicles.model = model;
            twowheelervehicles.vechile_type = vechile_type;
            twowheelervehicles.engine_fuel_type = engine_fuel_type;


            console.log(typeof twowheelervehicles.manufacturer)
            
           
            await twowheelervehicles.save()
            res.status(200).send({
                results : {
                    data : twowheelervehicles,
                    msg : 'data added to the table successfully'
                },
                errors : null
            });

        }catch(err){
            console.log(err)
            res.status(500).send({
                results : null,
                errors : `server error ${err.message}`
            });
        }
    }

})


// @route    POST /api/twowheelervehicles
// @desc     Edit new entry 
// @access   Public
router.put('/editentry',
async(req,res)=>{
    const {_id, manufacturer, model, vechile_type , engine_fuel_type} = req.body

    let twowheelervehicles = new TwoWheelerVehicles()
    twowheelervehicles.manufacturer = manufacturer;
    twowheelervehicles.model = model;
    twowheelervehicles.vechile_type = vechile_type;
    twowheelervehicles.engine_fuel_type = engine_fuel_type;

    TwoWheelerVehicles.updateOne({_id : _id},req.body, function (err,data){
        if (err) {
            res.status(500).send({
                results : null,
                errors : err.message
            })
        }else if (data) {
            res.status(200).send({
                results : {
                    msg : `${_id} user updated`
                }
            })
        }else{
            res.status(500).send(
                {
                    errors : 'something went wrong'
                }
            )
        }
    })





})





module.exports=router;