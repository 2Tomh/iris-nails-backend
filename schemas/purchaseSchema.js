const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema({

    quantity:{
        type:Number
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product',
    }
})

const Purchase = mongoose.model('purchase', PurchaseSchema);

module.exports = Purchase;