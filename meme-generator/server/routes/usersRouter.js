const express = require('express');
const router = express.Router();
const User = require('../models/user')

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('Log In Successfully');
});

//upload the registration info:(username and password) to the database
router.post('/registration', async function (req, res, next) {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })
    await user.save(function (err, doc) {
        if (err) {
            console.log('save error: ' + err);
        } else {
            console.log('save success \n' + doc);
        }
    });
    res.send('registration is successful');
})

module.exports = router;
