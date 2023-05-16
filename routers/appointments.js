const express = require("express");
const Appointment = require("../schemas/appointmentsSchema");
const User = require("../schemas/userSchema");
const router = express.Router()
const jwt = require("jsonwebtoken");
const verifyToken = require("../utils/auth");


router.post("/appointment", verifyToken, async (req, res) => {
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
        console.log(isHourTaken)
        if(isHourTaken?.length > 0){
               return res.status(401).send("this houe is alreadt taken")
        }

        // const token = req.headers?.authorization?.replace('Bearer ', "");

        // if(!token){
        //         return res.status(404).send();
        // }

        // const userId = jwt.verify(token, process.env.SECRET_TOKEN, (err, res) => {

        // });

        // if(!userId) return res.status(403).send();
        
        //         console.log(userId)
        // const user = await User.findById();
        

        // const appointment = new Appointment({ username: 'TOM', date: req.body.date, treatments: match, hour: req.body.hour });

        // await appointment.save()
        res.send()
})

router.get("/appointment", async (req, res) => {
        const appointment = await Appointment.find({ date: req.query.date });
        
        if (!appointment) {
                return res.status(404).send();
        }
        res.send(appointment)
})

router.get("/appointments" , async(req,res) =>{
        const  appointments = await Appointment.find({date:req.query.date , username:req.query,username , hour:req.query.hour, treatments:req.query.treatments})
        res.send(appointments)
        
})

module.exports = router;


