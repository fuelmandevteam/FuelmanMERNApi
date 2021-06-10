const express = require('express');
const Vendor = require('../models/Vendor');
const router = express.Router()

// @route    POST api/users
// @desc     Register User
// @access   Public
router.get('/',(req,res)=>{
    res.send('vendors Route');
})

// @route    GET api/users
// @desc     get all vendor list 
// @access   Public
router.get('/getallvendors',(req,res)=>{    
    try {
        Vendor.find({}, function(err, data){
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

// @route    GET api/vendors/'
// @desc     get vendors by id
// @access   Public
router.get('/getvendordata',(req,res)=>{
    try {
        Vendor.findOne({_id : req.body._id}, function (err,data){
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

// @route    GET api/users/'
// @desc     get user User
// @access   Public
router.get('/getvendordata',(req,res)=>{
    try {
        User.findOne({_id : req.body._id}, function (err,data){
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

//get vendor by name
router.get('/getvendorname',(req,res)=>{
    try {
        Vendor.findOne({name : req.body.name}, function (err,data){
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


router.get('/check/vendor',(req,res) => {
    const {name } = req.body;

    if(name != null || name != ""){
        res.status(200).send({
            error : "",
            msg : 'api is hit'
        });
    }else{
        res.status(400).send({
            error : "request not proper",
            msg : ''
        });
    }
    
})
module.exports = router;