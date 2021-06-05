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
    res.send('User Route');
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
    
    //see if User Exist 
        // if(user){
        //     res.status(400).json({
        //         errors : [{
        //             msg : 'User Already Exists'
        //         }]
        //     })
        // }
    //Get User Gravatar 
    // const avatar = gravatar.url(email_id,{
    //     s : '200',
    //     r : 'pg',
    //     d : 'mm'
    // })

    let user = new User(
        {name,email_id,avatar,login_type}
    )

    await user.save();
    console.log('***********save called***********')
    //Encrypt using bcrypt 

    } catch (err) {
        console.log(err.message);
        res.status(500).send(`server error ${err.message}`);
    }
    

    
  await res.send('register api hit');
})


// @route    GET api/users/check/email'
// @desc     Register User
// @access   Public
router.get('/check/email',[],
async (req,res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({
            errors : errors.array()
        })
    }
    const { email_id }  = req.body;
    try {
    
        let isUserExist = await isEmailExists(email_id)


        if(isUserExist){
            res.status(200).json({
                result : {
                    msg : `${email_id} is already registered`
                }
            })
        }else{
            res.status(100).json({
                result : {
                    msg : `${email_id} is not registered`
                }
            })
        }
    
        } catch (err) {
            console.log(err.message);
            res.status(500).send(`server error ${err.message}`);
        }

})

async function isEmailExists(id){
   let c = await User.count({email_id : id});
   console.log('$$$$$$$$$$$$$$4')
   console.log(`${id},${c}`)
   console.log('$$$$$$$$$$$$$$4')

   if(c > 0){
       return true;
   }
   else return false;

}




module.exports = router;