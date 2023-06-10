const jwt = require("jsonwebtoken");
const User = require("../schemas/userSchema");

const verifyToken = (req, res, next) => {
    const token = req.headers?.authorization?.replace('Bearer ', "");

    if(!token){
            return res.status(401).send();
    }

     jwt.verify(token, process.env.SECRET_TOKEN, (err, result) => {

        if(err){
            return res.status(403).send();
        }

        req.userId = result.userId;
        next();
    });

}

const verifyAdmin = async(req, res, next) => {
    const user = await User.findById(req.userId);

    if(!user.isAdmin) return res.status(403).send();

    next();
}

module.exports = {verifyToken, verifyAdmin};