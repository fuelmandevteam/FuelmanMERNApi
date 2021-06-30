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


module.exports = router;