const mongoose = require('mongoose');
//  model for mongoATlas for better 

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        Default: Date.now
    }


});

module.exports = User = mongoose.model('user', UserSchema);