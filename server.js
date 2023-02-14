const express = require("express");

const app = express();

const dbconfig = require('./db');
const providersRoute = require('./routes/providerRoute');
const usersRoute = require('./routes/userRoute');
const bookingsRoute = require('./routes/bookingRoute');

app.use(express.json());

app.use('/api/providers', providersRoute)
app.use('/api/users', usersRoute)
app.use('/api/bookings', bookingsRoute);



const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Node server started using nodemon"));