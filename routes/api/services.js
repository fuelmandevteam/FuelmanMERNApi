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
router.post('/addnewservice',
async (req,res)=>{
    const { service_name ,service_type , icon_url ,is_two_wheel,is_four_wheel}  = req.body;
    try {

    let service = new Services(
        { service_name ,service_type , icon_url ,is_two_wheel,is_four_wheel}
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


module.exports = router;