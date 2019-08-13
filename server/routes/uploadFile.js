var express = require("express");
var router = express.Router();
var multer = require('multer');
var path = require('path');
var request = require('request-promise');
var fs = require('fs');

var storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, path.join(__dirname + '/uploads/'))
   },
   filename: function (req, file, cb) {
     cb(null, file.originalname)
   }
})

var upload = multer({ storage : storage }).array('files');

router.post('/',function(req,res,next){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        req.files.forEach(file => {
          const options = {
            method: 'POST',
            uri:'https://api.sypht.com/fileupload',
            formData: {
              fileToUpload:fs.createReadStream(file.path),
              fieldSets:JSON.stringify(['sypht.invoice','sypht.document'])
            },
            headers:{
              'Authorization': 'Bearer ' + req.body.middlewaretoken
            },
            json:true
          }

          request(options).then(function (response){
            return res.status(200).send(response)
          })
          .catch(function (err) {
            console.log(err);
          })
        });

    });
});


module.exports = router;
