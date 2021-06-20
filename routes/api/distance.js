const express = require('express')
const router = express.Router()
const { check, validationResult} = require('express-validator');



// @route    GET api/distance
// @desc     check distance 
// @access   Public
router.get('/checkdistance',
async (req,res) =>{
    
    let distance = getdistance(
        req.body.lat_,
        req.body.lon_,
        req.body.lat2_,
        req.body.lon2_,
        "K"
    )

    if (distance != null) {
        res.status(200).send({
            results : {
                msg : distance
            }
        })
    }else{
        res.status(200).send({
            results : {
                msg : `something went wrong`
            }
        })
    }

})


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