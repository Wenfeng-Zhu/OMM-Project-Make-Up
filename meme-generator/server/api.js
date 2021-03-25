const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/usersRouter');
const imagesRouter = require('./routes/imagesRouter');
const emailRouter = require('./routes/emailRouter')

const api = express();
    //.catch(err => console.log(err));

// connection.on('error', function (error) {
//     console.log('Database connection failed: ' + error);
// })
// connection.on('open', function () {
//     console.log('Database connection is successful')
// })

// view engine setup
api.set('views', path.join(__dirname, 'views'));
api.set('view engine', 'jade');

api.use(cors());
api.use(logger('dev'));
api.use(express.json());
api.use(express.urlencoded({extended: false}));
api.use(cookieParser());
api.use(express.static(path.join(__dirname, 'public')));

api.use('/', indexRouter);
api.use('/users', usersRouter);
api.use('/images', imagesRouter);
api.use('/email', emailRouter);

// catch 404 and forward to error handler
api.use(function (req, res, next) {
    next(createError(404));
});

//error handler
api.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

//connect with mongodb atlas cloud database
const mongoURI = 'mongodb+srv://wenfeng_zhu:omm2021@cluster-wf.exrdi.mongodb.net/omm2021?retryWrites=true&w=majority'
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}, () => {
    console.log("Database connection is successful");
})
//     .catch(error => {
//     console.log('Database connection failed: ' + error);
// })


//Middleware for email registration and authentication
// api.use(function (req, res, next) {
//
// })

module.exports = api;
