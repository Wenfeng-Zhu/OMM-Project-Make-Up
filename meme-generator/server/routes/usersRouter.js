const express = require('express');
const router = express.Router();
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const SECRET = 'token_secret';

/* Verify login information */
router.post('/login', async function (req, res, next) {
    const user = await User.findOne({
        email: req.body.email
    })
    if (!user) {
        return res.status(422).send({
            message: 'The user with this email address does not exist'
        })
    }
    const isPasswordValid = require('bcrypt').compareSync(req.body.password, user.password);
    if (!isPasswordValid){
        return res.status(422).send({
            message: 'wrong password'
        })
    }
    const token = jwt.sign({email:user.email,username:user.username},SECRET);
    //alert(user+token);
    //console.log(user+' '+token)
    res.send({user,token});
});

/*upload the registration info:(username and password) to the database*/
router.post('/registration', async function (req, res, next) {
    const user = new User({
        email: req.body.email,
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
