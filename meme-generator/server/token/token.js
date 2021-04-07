const jwt = require('jsonwebtoken');
const SECRET = 'token_secret';
//const expressJwt = require("express-jwt");

//Generate token
const setToken = function (email, username) {
    return new Promise((resolve, reject) => {
        //Set the time to expire
        const token = jwt.sign({email: email, username: username}, SECRET, {expiresIn: '24h'});
        resolve(token)
    })
};
//token verification
const verToken = function (token) {
    return new Promise((resolve, reject) => {
        if (!token) {
            console.log('token is empty')
            reject({
                error: 'token is empty'
            })
        } else {
            jwt.verify(token, SECRET, function (err, data) {
                //Determine if it is valid based on the status returned
                if (err) {
                    resolve({
                        state: false,
                        message: 'token failed'
                    })
                } else {
                    resolve({
                        state: true,
                        message: 'token verification successful'
                    })
                }
            });
        }
    })
};
//导出引用
module.exports = {
    setToken,
    verToken,
    SECRET
}