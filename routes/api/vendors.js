const express = require('express')
const router = express.Router()

// @route    POST api/users
// @desc     Register User
// @access   Public
router.get('/',(req,res)=>{
    res.send('vendors Route');
})

module.exports = router;