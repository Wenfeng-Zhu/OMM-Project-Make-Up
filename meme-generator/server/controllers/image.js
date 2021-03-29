const fs = require('fs');
const path = require('path');
const ImageModel = require('../models/image');

module.exports = {
    // index: function(req, res) {
    //     const viewModel = { image: {}, comments: [] };
    //
    //     ImageModel.findOne({ filename: { $regex: req.params.image_id } }, function(
    //         err,
    //         image,
    //     ) {
    //         if (err) throw err;
    //         if (image) {
    //             // 增加该图片的访问量
    //             image.views += 1;
    //             viewModel.image = image;
    //             image.save();
    //             res.render('image', viewModel);
    //         } else {
    //             res.redirect('/');
    //         }
    //     });
    // },
    // create: function(req, res) {
    //     var tempPath = req.file.path;
    //     var imgUrl = req.file.filename;
    //     var ext = path.extname(req.file.originalname).toLowerCase();
    //     var targetPath = path.resolve('./server/public/upload' + imgUrl + ext);
    //
    //     if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
    //         fs.rename(tempPath, targetPath, function(err) {
    //             if (err) {
    //                 console.log(err);
    //             }
    //             else {
    //                 console.log(req.file)
    //                 res.send(req.file)
    //             }
    //             //res.redirect('/images/' + imgUrl);
    //         });
    //     } else {
    //         fs.unlink(tempPath, function(err) {
    //             if (err) {
    //                 console.log(err);
    //             }
    //             res.json(500, { error: '只允许上传图片文件.' });
    //         });
    //     }
    // },
    like: function(req, res) {
        res.send('The image:like POST controller');
    },
    comment: function(req, res) {
        res.send('The image:comment POST controller');
    },
};