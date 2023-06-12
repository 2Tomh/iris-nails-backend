const express= require('express');
const Purchase = require("../schemas/purchaseSchema");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {verifyToken, verifyAdmin} = require("../utils/auth");

router.post("/purchase", verifyToken, verifyAdmin ,async(req, res) => {
    
    if(!req.body.quantity || !req.body.productId){
        return res.status(403).send("All fields are required");
    }
    const purchase = new Purchase({quantity:req.body.quantity, product: req.body.productId});

    await purchase.save();
    res.send(purchase);
})


router.get("/purchases",verifyToken, verifyAdmin, async(req, res)=>{
    const purchases = await Purchase.find({}).populate("product");;
    res.send(purchases);
    
})

module.exports= router;