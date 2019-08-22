var express = require("express");
var router = express.Router();

var multer = require('multer');
var path = require('path');
var request = require('request-promise');
var fs = require('fs');

router.post('/',function(req,res,next){
  var guid = process.env.GUID;
  const options = {
      method: 'GET',
      uri: "https://abr.business.gov.au/json/AbnDetails.aspx?abn="+req.body.data.abn+"&callback=callback&guid="+guid,
      json: true,
  }
  request(options).then(function (response){
      return res.status(200).send(response)
  }).catch(function (err) {
      console.log(err);
  })
});


module.exports = router;
