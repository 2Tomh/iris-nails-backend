const express= require('express');
const Purchase = require("../schemas/purchaseSchema");
const router = express.Router();

router.post("/purchase", async(req, res) => {
    if(!req.body.quantity || !req.body.productId){
        return res.status(403).send("All fields are required");
    }
    const purchase = new Purchase({quantity:req.body.quantity, product: req.body.productId});
    
    await purchase.save();
    res.send(purchase);
})


router.get("/purchases", async(req, res)=>{
    const purchases = await Purchase.find().populate("product");;

    res.send(purchases);
    
})

module.exports= router;