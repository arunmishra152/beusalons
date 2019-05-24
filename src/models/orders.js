const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderId:{
        type: Number,
        required: true
    }, 
    userId: {
        type: Number,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required:true
    }
})

const Order = mongoose.model('Order',orderSchema)
module.exports = Order