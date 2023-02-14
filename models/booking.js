const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
    provider : {
        type: String,
        required: true
    },
    providerid : {
        type: String,
        required: true
    },
    userid : {
        type: String,
        required: true
    },
    lpgid : {
        type: Number,
        required: true
    },
    totalprice : {
        type: Number,
        required: true
    },
    transactionId : {
        type: String,
        required: true
    },
    status : {
        type: String,
        required: true,
        default: 'booked'
    }
}, {
    timestamps : true,
})

const bookingmodel = mongoose.model('bookings', bookingSchema);

module.exports = bookingmodel