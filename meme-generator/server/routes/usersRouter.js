const express = require('express');
const router = express.Router();
const User = require('../models/user')
const Admin = require('../models/admin')
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
    if (!isPasswordValid) {
        return res.status(422).send({
            message: 'wrong password'
        })
    }
    const token = jwt.sign({email: user.email, username: user.username}, SECRET);
    //alert(user+token);
    //console.log(user+' '+token)
    res.send({token});
});

/*upload the registration info:(username and password) to the database*/
router.post('/registration', async function (req, res, next) {
    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    })
    // const admin = new Admin({
    //     username:req.body.username,
    //     password:req.body.password
    // })
    await user.save(function (err, doc) {
        if (err) {
            console.log('save error: ' + err);
        } else {
            console.log('save success \n' + doc);
        }
    });
    res.send('registration is successful');
})

/* Verify admin information */
router.post('/admin', async function (req, res, next) {
    const admin = await Admin.findOne({
        username: req.body.username
    })
    if (req.body.password === admin.password) {
        res.send({success: true})
    } else {
        res.status(422);
    }
    // res.send({admin})
});

router.get('/usersList', async function (req, res, next) {
    await User.find({}, {email: 1, username: 1, password: 1}, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    })

})


module.exports = router;
