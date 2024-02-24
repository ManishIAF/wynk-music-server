const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true,
        unique : true
    },
    otp : {
        type : String,
        required : true,
    },
    otpExpiration: {
        type: Date,
        default: Date.now,
        expires: '1m'
    }
});

const OTP = mongoose.model('OTP', OTPSchema);

module.exports = OTP;