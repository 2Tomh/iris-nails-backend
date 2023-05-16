const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../schemas/userSchema");
const router = express.Router();

router.post("/signup", async (req, res) => {

    if (!req.body.username || !req.body.password || !req.body.address || !req.body.mail || !req.body.phoneNumber || isNaN(req.body.phoneNumber)) {

        return res.status(401).send("All fields are required");
    }

    const user = new User({ username: req.body.username, password: req.body.password, address: req.body.address, mail: req.body.mail, phoneNumber: req.body.phoneNumber });

    await user.save();
    res.status(200).send("Signed up succesfully")
})

router.post("/login", async (req, res) => {

    if (!req.body.username || !req.body.password) {
        return res.status(401).send("All fields are required");
    }

    const user = await User.findOne({ username: req.body.username });

    if (!user) {
        return res.status(404).send("User doesn't exist");
    }

    const isPassEqual = await bcrypt.compare(req.body.password, user.password);
    if (isPassEqual) {

        const token = jwt.sign({
            userId: user._id
        },
            process.env.SECRET_TOKEN, {
            expiresIn: '1h'
        });

        return res.status(200).send(token)
    }

    res.status(401).send("Email or password are invalid")

})


router.post("/verification", async (req, res) => {
    const user = await User.findOne({ username: req.body.username });

    if (!user || user.username != req.body.username) {
        return res.status(401).send("Email doesn't exist");
    }
    else return res.status(200).send("Verification is sent to your email")
})

module.exports = router;
