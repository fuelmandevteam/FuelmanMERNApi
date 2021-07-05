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
    check('service_name', 'Service_name').not().isEmpty(),
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
    const { service_name ,service_type , icon_url, sub_services_1, sub_services_2 ,is_two_wheel,is_four_wheel}  = req.body;
    try {

    let service = new Services(
        { service_name ,service_type , icon_url , sub_services_1,sub_services_2 ,is_two_wheel,is_four_wheel}
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