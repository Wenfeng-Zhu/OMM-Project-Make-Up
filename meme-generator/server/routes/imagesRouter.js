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
    await ImageModel.find({owner: 'public'}, {}, {sort: {timestamp: -1}}, function (err, images) {
        if (err) {
            console.log(err);
        } else {
            res.json(images);
        }
    })
});
//load all images which were saved by the user
router.get("/:email", async function (req, res, next) {
    // const viewModel = {images: []};
    await ImageModel.find({owner: req.params.email}, {}, {sort: {timestamp: -1}}, function (err, images) {
        if (err) {
            console.log(err);
        } else {
            res.json(images);
        }
    })
});

//get specific image with image_id
router.get("/:image_id/view",  function (req, res) {
    //const viewModel = {image: {}, comments: []};
    ImageModel.findOne({_id: req.params.image_id}, function (err, image) {
        if (err) {
            res.status(500).send('Error: '+err);
        } else if (image) {
            // Increase the number of visits to this image
            image.views += 1;
            //viewModel.image = image;
            image.save();
            res.send('View successfully');
        } else {
            res.status(500).send('Can not find the image');
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
    CommentModel.find({image_id: req.params.image_id}, {}, {sort: {timestamp: -1}}, function (err, comments) {
        if (err) {
            console.log(err);
        } else if (comments) {
            //console.log(comments)
            res.send(comments);
        } else {
            res.json('View failed');
        }

    })
});

//upload the image to database
router.post('/:email', upload.single('file'), function (req, res, next) {
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
                    name: req.file.originalname.substring(0, req.file.originalname.indexOf('.')),
                    owner: req.params.email,
                    url: imgUrl + ext,
                })
                newImg.save(function (err, image) {
                    if (err) {
                        console.log(err);
                        res.status(500).send('It is failed to save image to the db')
                        //.redirect('http://localhost:3000/admin/imagesList')
                    }
                })
                res.send('saved successfully')
                //.redirect('http://localhost:3000/admin/imagesList');
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

//delete the image which was saved in web
router.post('/:email/delete', function (req, res, next) {
    ImageModel.findOne({_id:req.body._id},async function (err, image) {
        if (err) {
            console.log(err);
        } else if (image) {
            fs.unlink(path.resolve('./server/public/upload/'+image.url), function (err) {
                if (err) {
                    console.log(err);
                }
            });
            await image.remove();
            res.send('The image was deleted from Mongodb and Web-Server');
        } else {
            res.send('Failed');
        }
    })
});

router.post('/:image_id/like', async function (req, res, next) {
    ImageModel.findOne({_id: req.params.image_id}, async function (err, image) {
        if (err) {
            console.log(err);
        } else if (image) {
            // Increase the number of visits to this image
            if (!image.likes.includes(req.body.email)) {
                image.likes.push(req.body.email);
            } else {
                image.likes.splice(image.likes.indexOf(req.body.email), 1)
            }
            //viewModel.image = image;
            await image.save();
            res.send('Add like successfully');
        } else {
            res.send('View failed');
        }
    });
});

router.get('/:image_id/like/:email', function (req, res, next) {
    console.log(req.headers['Authorization']);
    ImageModel.findOne({_id: req.params.image_id}, function (err, image) {
        if (err) {
            console.log(err);
        } else if (image) {
            const liked = image.likes.includes(req.params.email)
            res.status(200).send(liked);
        } else {
            res.send('View failed');
        }
    });
});


module.exports = router;