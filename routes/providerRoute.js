const express = require("express");
const router = express.Router();

const Provider = require('../models/provider')



router.get("/getallproviders", async(req, res)=>{

    try {
        const providers = await Provider.find({})
        res.send(providers);
    } catch (error) {
        return res.status(400).json({message: error});
    }

});

router.post("/getproviderbyid", async(req, res)=>{
    const providerid=req.body.providerid;
    try {
        const provider = await Provider.findOne({_id: providerid})
        res.send(provider);
    } catch (error) {
        return res.status(400).json({message: error});
    }

});

router.post("/addprovider", async(req, res)=>{
    try {
        const newprovider = new Provider(req.body)
        await newprovider.save()

        res.send('New Provider Added Successfully')
    } catch (error) {
        return res.status(400).json({error});
    }
})

module.exports = router;