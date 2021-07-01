const express = require('express');
const Vendor = require('../models/Vendor');
const router = express.Router()
const { check, validationResult} = require('express-validator');


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

// get vendor by distance

router.get('/getvendorsloc',[
    check('city','please enter your city').isEmpty(),
    check('lat','please enter correct lattitude value').isEmpty(),
    check('lon','please enter correct longitude value').isEmpty()
    ], (req,res)=>{ 
        const errors = validationResult(req)
        if(!errors.isEmpty()){
        res.status(400).json({
            errors : errors.array()
        })
        }   
    try {
        Vendor.find({city:req.body.city}, function(err, data){
            if (err){
                res.status(409).send({
                    results : null,
                    errors : err
                })
            }
            if (data) {
                const arr=[];
                data.forEach( item => {
                    let dist = getdistance(req.body.lat,req.body.lon,item.lat,item.long,"k");
                    console.log(dist);
                    if(dist<=item.distance_covered)
                    {
                        arr.push(item);
                    }
                });
                res.status(200).send({
                    results : arr,
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



//Register vendor
router.post('/register',async (req,res)=>{
    
    const {_id, name, mobile_no, email_id, No_of_workers, workers_name, shop_address, city, state, shop_licence, shop_image, avatar, lat, long, distance_covered, isshop_active} = req.body;
    try {
        let vendor = new Vendor(
            {name, mobile_no, email_id, No_of_workers, workers_name, shop_address, city, state, shop_licence, shop_image, avatar, lat, long, distance_covered, isshop_active}
        );
        await vendor.save();
    res.status(200).send({
        results : vendor,
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

//register mobile number
router.post('/registermobile',async (req,res) => {
    const {mobile_no,email_id} = req.body;
    try {
        let vendor = new Vendor({mobile_no,email_id});
        await vendor.save();
        res.status(200).send({
            results : vendor._id,
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

//check vendor
router.get('/checkvendor',(req,res) => {
    try {
        Vendor.findOne({mobile_no : req.body.mobile_no}, function (err,data){
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

//distance fuction
function getdistance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}


module.exports = router;