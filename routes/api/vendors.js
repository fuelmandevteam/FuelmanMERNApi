const express = require('express')
const router = express.Router()

// @route    POST api/users
// @desc     Register User
// @access   Public
router.get('/',(req,res)=>{
    res.send('vendors Route');
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