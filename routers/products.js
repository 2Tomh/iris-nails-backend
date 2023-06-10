const express= require('express');
const Product = require('../schemas/productSchema');
const router = express.Router();

router.post("/product" , async(req,res)=>{
    if(!req.body.quantity && !req.body.name && !req.body.price){
        return res.status(404).send("All fields are required")
    }

    const product = new Product({quantity:req.body.quantity ,name: req.body.name ,price: req.body.price, image:req.body.image, category:req.body.category} );

    await product.save();
    res.send()
})

router.get("/products" , async(req , res)=>{
    try {
        const products = await Product.find();
        if(!products){
            return res.status(404).send("Failed to find products");
        }
        res.send(products);
    } catch (error) {
        res.send(404).send("Failed");
    }

})

module.exports = router;