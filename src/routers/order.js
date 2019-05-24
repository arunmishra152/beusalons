const express = require('express')
const router = express.Router()
const Order = require('../models/orders')
const User = require('../models/users')

router.get('/orders', async (req, res) => {
    try {
        const user = await User.aggregate([
            {
                $lookup: {
                    from: 'Order',
                    localField: "userId",
                    foreignField: "userId",
                    as: 'UserData'
                },
            },
            {
                $unwind: '$UserData',
    
            },
            {
                $group:
                {
                    _id: { userId: '$UserData.userId', name: '$name' },
                    numberOfOrders: { $sum: 1 },
                    averagebillvalue: { $avg: '$UserData.subtotal' }
                },
            }
            , { $project: { 'userId': '$_id.userId', 'name': '$_id.name', 'numberOfOrders': 1, 'averagebillvalue': 1, '_id': 0 } },
            { $sort: { userId: 1 } }
    
    
        ])
        res.status(200).send(user)
    } 
    catch (error) {
        res.status(400).send("Something went wrong")
    }
})

module.exports = router