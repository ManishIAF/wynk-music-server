const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    authToken : {
        type : String,
        unique : true
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;