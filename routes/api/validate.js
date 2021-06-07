const express = require('express')
const router = express.Router()
const { check, validationResult} = require('express-validator');

const User = require('../models/User');

router.get('/',(req,res)=>{
    res.send('validate')
})



router.get('/user/email',[

],async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({
            errors : errors.array()
        })
    }

    const { email_id} = req.body;

    User.findOne({email_id : email_id}, function (err,data){
        if (err) {
            res.status(200).send({
                is_present : null,
                errors : [
                    {
                    msg : 'something went wrong'
                }]            
            })
        } else if (data) {
            res.status(200).send({
                is_present : true,
                msg :`${email_id} is present `
            })            
        }else{
            res.status(200).send({
                is_present : false,
                errors : [
                    {
                    msg : 'something went wrong'
                }]
            })
        }

    })
})



router.get('/user/mobile',[
],async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({
            errors : errors.array()
        })
    }

    const { mobile_no } = req.body;

    User.findOne({mobile_no : mobile_no}, function (err,data){
        if (err) {
            res.status(200).send({
                is_present : null,
                errors : [
                    {
                    msg : 'something went wrong'
                }]            
            })
        } else if (data) {
            res.status(200).send({
                is_present : true,
                msg :`${mobile_no} is present `
            })            
        }else{
            res.status(200).send({
                is_present : false,
                errors : [
                    {
                    msg : 'something went wrong'
                }]
            })
        }

    })
})

 

module.exports = router;