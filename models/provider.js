const mongoose = require("mongoose");

const providerSchema = mongoose.Schema({
    name : {
        type: String, 
        required : true 
    },
    phonenumber : {
        type : Number,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    imageurls : [],
    currentbookings : [],
    description : {
        type : String,
        required : true
    }
}, {
    timestamps: true,
})

const providerModel = mongoose.model('provider', providerSchema)

module.exports = providerModel