const express = require("express");
const router = express.Router();
const multer = require('multer')
const path = require("path");
const upload = multer({dest: path.join(__dirname, '../public/upload/temp')});
const fs = require('fs');
const ImageModel = require('../models/image');
const CommentModel = require('../models/comment');

//load all images from database
router.get("/", async function (req, res, next) {
    // const viewModel = {images: []};
    await ImageModel.find({}, {}, {sort: {timestamp: -1}}, function (err, images) {
        if (err) {
            console.log(err);
        } else {
            res.json(images);
        }
        //viewModel.images = images;

    })
});

//get specific image with image_id
router.get("/:image_id", function (req, res) {
    //const viewModel = {image: {}, comments: []};
    ImageModel.findOne({_id: req.params.image_id}, function (err, image) {
        if (err) {
            console.log(err);
        }
        else if (image) {
            // Increase the number of visits to this image
            image.views += 1;
            //viewModel.image = image;
            image.save();
            res.send('View successfully');
        }
        else {
            res.send('View failed');
        }

    });
});

router.post('/:image_id/comment', async function (req, res, next) {
    const newComment = new CommentModel({
        image_id: req.body.image_id,
        email: req.body.email,
        username: req.body.username,
        comment: req.body.comment,
    })
    await newComment.save(function (err, doc) {
        if (err) {
            console.log('save error: ' + err);
        } else {
            console.log('save success \n' + doc);
            res.send('The image:comment POST successfully');
        }
    })
});

router.get('/:image_id/comments', async function (req, res, next) {
    CommentModel.find({image_id: req.params.image_id},{},{sort: {timestamp: -1}},function (err, comments) {
        if (err) {
            console.log(err);
        }
        else if (comments) {
            console.log(comments)
            res.send(comments);
        }
        else {
            res.json('View failed');
        }

    })
    // const newComment = new CommentModel({
    //     image_id: req.body.image_id,
    //     email: req.body.email,
    //     username: req.body.username,
    //     comment: req.body.comment,
    // })
    // await newComment.save(function (err, doc) {
    //     if (err) {
    //         console.log('save error: ' + err);
    //     } else {
    //         console.log('save success \n' + doc);
    //         res.send('The image:comment POST successfully');
    //     }
    // })
});

//upload the image to database
router.post('/', upload.single('file'), function (req, res, next) {
    let tempPath = req.file.path;
    let imgUrl = req.file.filename;
    let ext = path.extname(req.file.originalname).toLowerCase();
    let targetPath = path.resolve('./server/public/upload/' + imgUrl + ext);

    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
        fs.rename(tempPath, targetPath, function (err) {
            if (err) {
                console.log(err);
            } else {
                const newImg = new ImageModel({
                    name: req.file.originalname.substring(0,req.file.originalname.indexOf('.')),
                    owner: 'public',
                    url: imgUrl + ext,
                })
                newImg.save(function (err, image) {
                    if (err) {
                        console.log(err);
                        res.status(500).redirect('http://localhost:3000/admin/imagesList')
                    }
                })
                res.status(200).redirect('http://localhost:3000/admin/imagesList');
            }
        });
    } else {
        fs.unlink(tempPath, function (err) {
            if (err) {
                console.log(err);
            }
            res.json(500, {error: 'Only image files are allowed to be uploaded.'});
        });
    }
});

router.post('/:image_id/like', function (req, res, next) {
    res.send('The image:like POST controller');
});




module.exports = router;