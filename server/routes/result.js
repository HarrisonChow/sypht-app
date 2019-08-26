var express = require("express");
var router = express.Router();
var path = require('path');
var request = require('request-promise');

router.post('/',function(req,res,next){
  const options = {
      method: 'GET',
      uri: 'https://api.sypht.com/result/final/'+req.body.data.fileId,
      json: true,
      headers:{
        'Authorization': 'Bearer '+req.body.data.token
      }
  }

  request(options).then(function (response){
      return res.status(200).send(response)
  }).catch(function (err) {
      console.log(err);
  })
});


module.exports = router;
