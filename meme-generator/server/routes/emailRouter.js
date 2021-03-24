const express = require('express');
const router = express.Router();
const {User} = require('../models/user')

/* GET users listing. */
router.get('/', async function (req, res, next) {
    const email = req.body.
    res.send('email sent successfully');
});

module.exports = router;