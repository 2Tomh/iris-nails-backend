const jwt = require("jsonwebtoken")
const verifyToken = (req, res, next) => {
    const token = req.headers?.authorization?.replace('Bearer ', "");

    if(!token){
            return res.status(404).send();
    }

     jwt.verify(token, process.env.SECRET_TOKEN, (err, result) => {

        console.log(err, "$$")
        if(err){
            return res.status(403).send();
        }

        console.log(result, "####" );
    });

    // console.log(isVerified, "%%%")
}

module.exports = verifyToken;