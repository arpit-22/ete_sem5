const express = require("express");
const router = express.Router();

const Booking = require("../models/booking");
const Provider = require("../models/provider");

router.post("/bookgas", async(req, res)=>{

    const {
        provider,
        userid,
        lpgid,
        totalprice
    } = req.body


    try {
        const newbooking = new Booking({
            provider: provider.name,
            providerid: provider._id,
            userid,
            lpgid,
            totalprice,
            transactionId: '1234'
        })

        const booking = await newbooking.save()

        const providertemp = await Provider.findOne({_id: provider._id})
        providertemp.currentbookings.push({bookingid: booking._id, userid: userid, status: booking.status});

        await providertemp.save()
        res.send("LPG Booked Successfully")
    } catch (error) {
        return res.status(400).json({error});
    }
});

router.get("/getallbookings", async(req, res)=>{

    try {
        const bookings = await Booking.find()
        res.send(bookings)
    } catch (error) {
        return res.status(400).json({error});
    }
});

router.post("/getbookingsbyuserid", async(req, res)=>{
    const userid = req.body.userid

    try {
        const bookings = await Booking.find({userid : userid})
        res.send(bookings)
    } catch (error) {
        return res.status(400).json({error});
    }
})

router.post("/cancelbooking", async(req, res)=>{
    const {bookingid, providerid} = req.body
    try {
        const booking = await Booking.findOne({_id : bookingid})
        booking.status='cancelled'
        await booking.save()
        const provider = await Provider.findOne({_id : providerid})
        const bookings = provider.currentbookings
        const temp = bookings.filter(booking => booking.bookingid.toString()!==bookingid)
        provider.currentbookings = temp

        await provider.save()
        res.send('Your booking cancelled successfully')
    } catch (error) {
        return res.status(400).json({error});
    }
})

module.exports = router;