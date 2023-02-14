const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://arpit_22:arpit2229@cluster0.5i1bl4w.mongodb.net/gas-booking'
// var mongoURL = 'mongodb+srv://arpit_22:arpit2229@cluster0.5i1bl4w.mongodb.net/gas-booking?retryWrites=true&w=majority'

mongoose.connect(mongoURL, {useUnifiedTopology : true, useNewUrlParser : true})
 
var connection = mongoose.connection

connection.on('error', ()=>{
    console.log("Mongo DB connection failed")
})

connection.on('connected', ()=>{
    console.log("Mongo DB connection successful")
})


module.exports = mongoose