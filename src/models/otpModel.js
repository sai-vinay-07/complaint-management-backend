const mongoose = require('mongoose');

const otpSchmea = new mongoose.Schema({
    email :{
        type : String,
        required : true,
        unique : true
    },
    otp :{
        type : String
    },
    expairsAt :{
        type : Date
    },
    isVerified :{
        type : Boolean,
        default : false
    }
},
{timestamps : true})

module.exports = mongoose.model('Otp',otpSchmea)