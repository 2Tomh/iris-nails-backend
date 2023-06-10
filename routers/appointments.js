const express = require("express");
const Appointment = require("../schemas/appointmentsSchema");
const User = require("../schemas/userSchema");
const router = express.Router()
const jwt = require("jsonwebtoken");
const {verifyToken, verifyAdmin} = require("../utils/auth");


router.post("/appointment", verifyToken, async (req, res) => {
        if(!req.body.hour || !req.body.date) return res.status(404).send()
        const match = []
        if (req.body.treatments.menicure) {
                match.push("menicure")
        }
        if (req.body.treatments.mustache) {
                match.push("mustache")
        }
        if (req.body.treatments.eyebrow) {
                match.push("eyebrow")
        }
        if (req.body.treatments.pedicure) {
                match.push("pedicure")
        }
 
        const isHourTaken = await Appointment.find({date: req.body.date, hour: req.body.hour})

        if(isHourTaken?.length > 0){
               return res.status(401).send("this hour is already taken")
        }

        
        const user = await User.findById(req.userId);


        if(!user){
                return res.status(404).send("Failed to find user");
        }
        
        const appointment = new Appointment({ username: user.username, date: req.body.date, treatments: match, hour: req.body.hour , phone:user.phoneNumber});

        await appointment.save()
        res.send()
})

router.get("/appointment", verifyToken, async (req, res) => {
        const appointment = await Appointment.find({ date: req.query.date });
        
        if (!appointment) {
                return res.status(404).send();
        }
        res.send(appointment)
})

router.get("/appointments" , verifyToken, verifyAdmin, async(req,res) =>{
        const  appointments = await Appointment.find({})
        res.send(appointments)
        
})

module.exports = router;


