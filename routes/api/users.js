const express = require('express')
const router = express.Router()
const { check, validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar');

const User = require('../models/User');

// @route    GET api/users
// @desc     Register User
// @access   Public
router.get('/',(req,res)=>{
    const { name } = req.body;
    res.send({
        msg : User.array 
    })
    res.send('User Route');
})


// @route    GET api/users
// @desc     get all User list 
// @access   Public
router.get('/getallusers',(req,res)=>{    
    try {
        User.find({}, function(err, data){
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

// @route    POST api/users/register/mobile'
// @desc     Register User
// @access   Public
router.post('/register/mobile',[
    //check('mobile_no','please enter valid Mobile').isEmpty()
],
async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({
            errors : errors.array()
        })
    }

    const { _id , name ,mobile_no , email_id ,dob,address_line_1 ,address_line_2 ,avatar ,login_type}  = req.body;
    try {

    let user = new User(
        {name,mobile_no,email_id,dob,address_line_1,address_line_2,avatar,login_type}
    )

    await user.save();
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


// @route    GET api/users/'
// @desc     get user User
// @access   Public
router.get('/getuserdata',(req,res)=>{
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


router.put('/edit/user',(req,res)=>{
    const { _id , name ,mobile_no , email_id ,dob,address_line_1 ,address_line_2 ,avatar ,login_type}  = req.body;
    let user = new User(
        {name,mobile_no,email_id,dob,address_line_1,address_line_2,avatar,login_type}
    )

    User.updateOne({_id : _id}, req.body,function (err,data){
        if(err){
            res.status(500).send(
                {
                    errors : err.message
                }
            )
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

module.exports = router;