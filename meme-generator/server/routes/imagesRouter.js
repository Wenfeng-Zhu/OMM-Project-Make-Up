const express = require("express");
const router = express.Router();
const multer = require('multer')
const ImageModel = require('../models/image')
const path = require("path");
//const upload = multer({ dest: path.join(__dirname, './public/upload/temp') });

router.get("/", function (req, res, next) {
    res.send('The images controller');
});

router.get("/:image_id", function (req, res, next) {
    res.send('The image: index controller '+ req.params.image_id);
});

//upload the image to the temp path in the server
router.post('/',function (req,res,next) {
    res.send('The image:create POST controller');
});

router.post('/:image_id/like',function (req,res,next) {
    res.send('The image:like POST controller');
});

router.post('/:image_id/comment',function (req,res,next) {
    res.send('The image:comment POST controller');
});


module.exports = router;