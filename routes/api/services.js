const express = require('express')
const router = express.Router()
const { check, validationResult} = require('express-validator');

const Services = require('../models/Services')

// @route    GET api/services
// @desc     Test Services route
// @access   Public
router.get('/',async (req,res)=>{
    res.status(200).send({
        results : "test services"
    })
})



// @route    POST api/services'
// @desc     Add new Services 
// @access   Public
router.post('/addnewservice', [
    check('service_names', 'service_names').not().isEmpty(),
    check('service_type', 'Service_type').not().isEmpty(),
    check('icon_url', 'Icon_url').not().isEmpty(),

],
async (req,res)=>{
    const error = validationResult(req);
    if (!error.isEmpty()) {
       let msg = ''
       error.array().forEach(item => {
           msg = msg + item.msg + ", "
       })
       
       return res.status(400).json({ errors: `${msg} are required` });
    }
    const { affected_area,service_names ,service_type , icon_url ,is_two_wheel,is_four_wheel}  = req.body;
    try {

    let service = new Services(
        { affected_area, service_names ,service_type , icon_url  ,is_two_wheel,is_four_wheel}
    )

    await service.save();
    res.status(200).send({
        results : {
            msg : `service added succesfully`
        },
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
// @route    GET api/services
// @desc     get all services list 
// @access   Public
router.get('/getallservice',(req,res)=>{    
    try {
        Services.find({}, function(err, data){
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

//Delete services
router.delete('/deleteservice',(req,res)=>{    
    try {
        Services.findOneAndDelete({affected_area : req.body.affected_area}, function (err, data) {
            if (err){
                console.log(err)
            }
            else{
                res.status(200).send({
                    results : data,
                    msg : affected_area + 'Deleted sucessfully',
                    errors : null
                })
            }
    })
 } catch (err) {
        res.status(409).send({
            results : null,
            errors : err
        })
    }
})
// get by type
router.get('/getservicebytype',(req,res)=>{    
    try {
        Services.find({service_type : req.body.service_type}, function(err, data){
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
//update services
router.put('/updateservice',(req,res)=>{    
    try {
        Services.findByIdAndUpdate({_id : req.body._id},{affected_area : req.body.affected_area}, function (err, data) {
            if (err){
                console.log(err)
            }
            else{
                res.status(200).send({
                    results : data,
                    errors : null
                })
            }
    })
 } catch (err) {
        res.status(409).send({
            results : null,
            errors : err
        })
    }
})
module.exports = router;    