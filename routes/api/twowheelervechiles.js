const express = require('express')
const router = express.Router()
const { check, validationResult} = require('express-validator');


const TwoWheeler = require('../models/TwoWheelervechiles');

router.get('/',(req,res)=>{
    res.send('twowheeler Route');
})

// @route    GET api/two_wheeler
// @desc     get all two wheelers list 
// @access   Public
router.get('/getalltwowheeler',(req,res)=>{    
    try {
        TwoWheeler.find({}, function(err, data){
            if (err){
                res.status(409).send({
                    results : null,
                    errors : err
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

// get by model

router.get('/gettwowheelermodel',(req,res)=>{
    try {
        TwoWheeler.findOne({model : req.body.model}, function (err,data){
            if(err){
                res.status(500).send({
                    errors : err
                })
            }else if(data){
                res.status(200).send({
                    results : data
                })
            }else{
                res.status(500).send({
                    errors : 'something went wrong'
                })
            }
    })
        
    } catch (err) {
        res.status(500).send(err)
    }
})


// @route   register two_wheeler

router.post('/register/two_wheeler',[
    check('manfacturer','please enter manufacturer').isEmpty(),
    check('model','please enter model number').isEmpty(),
    check('vechile_type','please enter vechile_type').isEmpty(),
    check('engine_type','please enter engine_type').isEmpty(),
],
async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({
            errors : errors.array()
        })
    }

    const { _id , manufacturer, model, vechile_type, engine_type}  = req.body;
    try {

    let twowheeler = new twowheeler(
        {manufacturer, model, vechile_type, engine_type}
    )

    await twowheeler.save();
    res.status(200).send({
        results : user,
        errors : null
    })

    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            results : null,
            errors : `server error ${err.message}`
        });
    }

    
})

module.exports=router;