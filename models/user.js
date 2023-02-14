const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    lpgid: {
        type: Number,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean, default: false
    }
}, {
    timestamps: true,
}) 

const userModel = mongoose.model('users', userSchema)

module.exports = userModel;