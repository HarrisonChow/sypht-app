var express = require("express");
let request = require('request-promise');
require('dotenv').config();

var router = express.Router();

router.get("/", function(req, res, next) {

  var client_id = process.env.CLIENT_ID;
  var client_secret = process.env.CLIENT_SECRET;
  const options = {
      method: 'POST',
      uri: 'https://login.sypht.com/oauth/token',
      body:{
        client_id: client_id,
        client_secret: client_secret,
        audience: "https://api.sypht.com",
        grant_type: "client_credentials"
      },
      json: true,
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
  }

  request(options).then(function (response){
      res.status(200).json(response.access_token);
  })
  .catch(function (err) {
      console.log(err);
  })
});

module.exports = router;
