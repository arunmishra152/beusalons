const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    NoOfOrders: {
        type: Number
    }
})

const User = mongoose.model('User',userSchema)
module.exports = User;


