const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        unique:true,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        set(val){
            return require('bcrypt').hashSync(val,10);
        }
    },
})

const User = mongoose.model('users', UserSchema);

module.exports = User;