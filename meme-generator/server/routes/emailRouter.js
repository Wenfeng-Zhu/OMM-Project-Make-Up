const express = require('express');
const router = express.Router();
const {User} = require('../models/user')

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('email sent successfully');
});

module.exports = router;